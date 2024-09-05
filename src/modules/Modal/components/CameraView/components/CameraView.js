import React, { useEffect, useRef, useState } from 'react'
import {
	Pressable,
	View,
} from 'react-native'
import {
	ActivityIndicator,
} from '@components'
import { Camera, FlashMode } from 'expo-camera'
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

export default ({ disabled, onCapture, ...props }) => {

	const { user } = useApp()
	const { clearModal } = useModal()

	const [ hasPermission, setHasPermission ] = useState(null)
	const [ cameraType, setCameraType ] = useState('back')
	const [ isCameraReady, setIsCameraReady ] = useState(false)
	const [ previews, setPreviews ] = useState([])
	const [ cameraError, setCameraError ] = useState(null)
	const [ showInstructions, setShowInstructions ] = useState(true)
	const [ flashMode, setFlashMode ] = useState(FlashMode.off)
	const [ zoom, setZoom ] = useState(0.5)

	const cameraRef = useRef()

	// const transition = useRef(new Animated.Value(1)).current

	// const animate = () => {
	// 		console.log('animating...')
	// 		Animated.timing(transition, {
	// 			toValue: 0,
	// 			duration: 3000,
	// 			useNativeDriver: true,
	// 		}).start()
	// 	}

  	// const [ initialHeight, setInitialHeight ] = useState(null)

	let timer = undefined

	const getCameraPermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		setHasPermission(status === 'granted')
	}

	useEffect(() => {
		if (!hasPermission) getCameraPermission()

		timer = setTimeout(stopTimer, 3000)
	}, [])

	const handlePreview = async () => {
		if (cameraRef.current && isCameraReady) {
			if (disabled) await cameraRef.current.pausePreview()
			else await cameraRef.current.resumePreview()
		}
	}

	useEffect(() => {
		handlePreview()
	}, [disabled])

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
			else onCapture(data)//addPreview(data)
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

	// const onBip = async bip => {
	// 	socket.emit('new_bip', bip)
	// 	addBip(bip)
	// 	clearModal()
	// }
	
	// const onSubmission = () => {
	// 	animate()
	// }

	if (hasPermission === null) {
		return <View />
	}
	
	const handleMountError = error => {
		setCameraError(error)
		launchFileSelector()
	}

	const launchFileSelector = async () => {
		const uri = await openFileSelector()
		if (uri) {
			handleSelectedImage(uri)
		}
	}

	const handleClose = async () => {
		if (cameraRef.current && isCameraReady) {
			await cameraRef.current.pausePreview()
		}
		setIsCameraReady(false)
		clearModal()
	}

	return (
		<View
			{...props}
			style={{
				flex: 1,
				width: '100%',
				// height: '100%',
				borderWidth: 1,
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<Camera
				ref={cameraRef}
				style={{
					width: '100%',
					height: '100%',

					// height: cameraHeight,
					// ...StyleSheet.absoluteFillObject,
					// position: 'absolute',
					// top: 0,
					// right: 0,
					// bottom: 0,
					// left: 0,
					zIndex: 1,
				}}
				type={cameraType}
				flashMode={flashMode}
				zoom={zoom}
				onCameraReady={() => setIsCameraReady(true)}
				onMountError={handleMountError}
			/>

			{isCameraReady && (
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingHorizontal: 10,
						zIndex: 200,
					}}
				>
					<Pressable
						onPress={toggleFlash}
						style={{
							opacity: disabled ? 0.5 : 1,
						}}
						disabled={disabled}
					>
						<Icon
							name={flashMode === FlashMode.on ? 'flash-sharp' : 'flash-off-sharp'}
							size={24}
							color='#fff'
						/>
					</Pressable>
					
					<Pressable
						onPress={handleClose}
						style={{
							opacity: disabled ? 0.5 : 1,
						}}
						disabled={disabled}
					>
						<Icon
							name='close-sharp'
							size={30}
							color='#fff'
						/>
					</Pressable>
				</View>
			)}

			{isCameraReady ? (
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: 80,
						zIndex: 300,
					}}
				>
					<Pressable
						onPress={takePicture}
						disabled={!isCameraReady || disabled}
						style={{
							marginHorizontal: 'auto',
							width: 50,
							height: 50,
							borderRadius: 25,
							overflow: 'hidden',
							borderWidth: 3,
							borderColor: '#fff',
							backgroundColor: (!isCameraReady || disabled) ? '#ccc' : 'tomato',
						}}
					/>
				</View>
			) : <ActivityIndicator />}

		</View>
	)
}