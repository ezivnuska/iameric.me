import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
	Animated,
	Easing,
	Pressable,
	SafeAreaView,
	View,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Camera, FlashMode } from 'expo-camera'
import {
	BipPreview,
	CameraView,
} from './components'
import {
	ActivityIndicator,
	Slider,
	ThemedText,
	Switch,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@modules/Bipster'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import {
  handleImageData,
  openFileSelector,
} from '@utils/images'
import EXIF from 'exif-js'

export default () => {

	const { dims, user } = useApp()
	const { addBip, setNewBip } = useBips()
	const { closeModal } = useModal()
	const { socket } = useSocket()

	const isFocused = useIsFocused()

	const [ hasPermission, setHasPermission ] = useState(null)
	const [ cameraType, setCameraType ] = useState('back')
	const [ isCameraReady, setIsCameraReady ] = useState(false)
	const [ containerHeight, setContainerHeight ] = useState(null)
	const [ previews, setPreviews ] = useState([])
	const [ uploading, setUploading ] = useState(false)
	const [ cameraError, setCameraError ] = useState(null)
	const [ showInstructions, setShowInstructions ] = useState(true)
	const [ flashMode, setFlashMode ] = useState(FlashMode.off)
	const [ zoom, setZoom ] = useState(0.5)

	// const cameraRef = useRef()
	const containerRef = useRef()

	const transition = useRef(new Animated.Value(1)).current

	const animate = () => {
		// console.log('animating...')
		Animated.timing(transition, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
			easing: Easing.bounce,
		}).start()
	}

	let timer = undefined

	const getCameraPermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		setHasPermission(status === 'granted')
	}

	useEffect(() => {
		if (!hasPermission) getCameraPermission()

		timer = setTimeout(stopTimer, 3000)
	}, [])

	const toggleFlash = () => {
		if (flashMode === FlashMode.on) setFlashMode(FlashMode.off)
		else setFlashMode(FlashMode.on)
	}

	const stopTimer = () => {
		clearTimeout(timer)
		timer = undefined
		setShowInstructions(false)
	}

	const addPreview = async selectedImage => {
		setPreviews([
			selectedImage,
			...previews,
		])
	}

    useEffect(() => {
		if (containerRef.current) setContainerHeight(containerRef.current.clientHeight)
    }, [containerRef.current])

    // useEffect(() => {
    //     console.log('containerHeight', containerHeight)
    // }, [containerHeight])

	const removePreview = index => {
		const updatedList = previews.filter((img, i) => i !== index)
		setPreviews(updatedList)
	}

	const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

	const handleSelectedImage = async uri => {
		const blob = await dataURItoBlob(uri)
		const reader = new FileReader()
		reader.onload = ({ target }) => {
			const exif = EXIF.readFromBinaryFile(target.result)
			loadImage(uri, exif, user._id)
		}
		reader.readAsArrayBuffer(blob)
	}

	const loadImage = async (src, exif, id) => {
		const image = new Image()
		image.onload = async () => {
			const data = await handleImageData(id, image, exif)
			if (!data) console.log('error loading image')
			else addPreview(data)
		}
		image.src = src
	}

	const onBip = async bip => {
		setUploading(false)
		socket.emit('new_bip', bip)
		addBip(bip)
		closeModal()
	}
	
	const onSubmission = () => {
		setUploading(true)
		animate()
	}

	if (hasPermission === null) {
		return <View />
	}
	
	// const handleMountError = error => {
	// 	setCameraError(error)
	// 	launchFileSelector()
	// }

	const launchFileSelector = async () => {
		const uri = await openFileSelector()
		if (uri) {
			handleSelectedImage(uri)
		}
	}

	return (
		<View
			ref={containerRef}
			style={{
				flex: 1,
				backgroundColor: '#000',
			}}
		>
			{containerHeight ? (
				<View style={{ flex: 1 }}>
					
					<View
						style={{
							flexBasis: 'auto',
							flexShrink: 1,
						}}
					>
						<Animated.View
							style={{
								width: '100%',
								height: transition.interpolate({
									inputRange: [0, 1],
									outputRange: [0, containerHeight * 0.7],
								}),
							}}
						>
							{!cameraError && (
								<View
									style={{
										flex: 1,
										width: '100%',
									}}
								>
									{(isFocused)
										? (
											<CameraView
												disabled={uploading}
												type={cameraType}
												flashMode={flashMode}
												zoom={zoom}
												// onMountError={handleMountError}
												// onReady={() => setIsCameraReady(true)}
												onCapture={addPreview}
											/>
										)
										: <ActivityIndicator />
									}
								</View>
							)}
						</Animated.View>
					</View>

					<View
						style={{
							flex: 1,
							width: '100%',
							flexGrow: 1,
							flexDirection: 'row',
							alignItems: 'flex-start',
						}}
					>
						<BipPreview
							images={previews}
							onBip={onBip}
							onSubmission={onSubmission}
							onRemove={removePreview}
						/>
					</View>
				</View>
			)
			: <ActivityIndicator />}
			
		</View>
	)
}