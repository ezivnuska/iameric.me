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
import { useBips } from '@bips'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import {
  handleImageData,
  openFileSelector,
} from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'
import EXIF from 'exif-js'

export default () => {

	const { dims, user } = useApp()
	const { addBip } = useBips()
	const { clearModal } = useModal()
	const { socket } = useSocket()

	const isFocused = useIsFocused()

	const [ hasPermission, setHasPermission ] = useState(null)
	const [ cameraType, setCameraType ] = useState('back')
	// const [ isCameraReady, setIsCameraReady ] = useState(false)
	const [ containerHeight, setContainerHeight ] = useState(null)
	const [ previews, setPreviews ] = useState([])
	const [ uploading, setUploading ] = useState(false)
	const [ cameraError, setCameraError ] = useState(null)
	const [ showInstructions, setShowInstructions ] = useState(true)
	const [ flashMode, setFlashMode ] = useState(FlashMode.off)
	const [ zoom, setZoom ] = useState(0.5)

	// const cameraRef = useRef()

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

  	const [ initialHeight, setInitialHeight ] = useState(null)

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

	const takePicture = async () => {
	
		stopTimer()

		if (cameraRef.current) {
			const options = {
				quality: 0.5,
				base64: true,
				skipProcessing: true,
			}
			const source = await cameraRef.current.takePictureAsync(options)
			if (!source || !source.uri) alert('no source from camera')

			await handleSelectedImage(source.uri)
		}
	}

	const onBip = async bip => {
		socket.emit('new_bip', bip)
		addBip(bip)
		clearModal()
	}
	
	const onSubmission = () => {
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

	// const handleClose = async () => {
	// 	if (cameraRef.current && isCameraReady) {
	// 		await cameraRef.current.pausePreview()
	// 	}
	// 	setIsCameraReady(false)
	// 	clearModal()
	// }

	// useEffect(() => {
	// 	console.log('initialHeight', initialHeight)
	// }, [initialHeight])

	return (
		<View
			// onLayout={e => {
			// 	const { height } = e.nativeEvent.layout
			// 	console.log('initialHeight', height)
			// 	setInitialHeight(height)
			// }}
			style={{
				flex: 1,
				// height: '100%',
				backgroundColor: '#000',
				justifyContent: 'flex-start',
				// dev
				// borderWidth: 1,
				// borderColor: '#fff',
				// borderStyle: 'dashed',
			}}
		>
			<View
				style={{
					flex: 1,
					flexBasis: 'auto',
					width: '100%',
				}}
			>
				<View
					style={{
						flex: 1,
						flexBasis: 'auto',
					}}
				>
					<Animated.View
						style={{
							height: transition.interpolate({
								inputRange: [0, 1],
								outputRange: [0, dims.height * 0.6],
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

								{isFocused && (
									<CameraView
										disabled={uploading}
										type={cameraType}
										flashMode={flashMode}
										zoom={zoom}
										// onMountError={handleMountError}
										onCapture={addPreview}
									/>
								)}
							</View>
						)}
					</Animated.View>
					<Animated.View
						style={{
							height: transition.interpolate({
								inputRange: [0, 1],
								outputRange: [dims.height, dims.height * 0.4],
							}),
						}}
					>
						{/* <Switch /> */}
						<BipPreview
							images={previews}
							onBip={onBip}
							onSubmission={onSubmission}
							onRemove={removePreview}
							setUploading={setUploading}
						/>
					</Animated.View>
				</View>
			</View>
			
		</View>
	)
}