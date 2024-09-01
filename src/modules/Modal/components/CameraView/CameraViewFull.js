import React, { useEffect, useRef, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import { Camera, FlashMode } from 'expo-camera'
// import { askAsync, CAMERA } from 'expo-permissions'
import { BipPreview } from './components'
import {
	IconButton,
	ModalHeader,
	Slider,
	ThemedText,
} from '@components'
import { useApp } from '@app'
import { useBips } from '@bips'
import { useModal } from '@modal'
import {
  handleImageData,
  openFileSelector,
} from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'
import EXIF from 'exif-js'

export default () => {

  const { theme, user } = useApp()
  const { addBip } = useBips()
  const { clearModal, closeModal } = useModal()

  const [ hasPermission, setHasPermission ] = useState(null)
  const [ cameraType, setCameraType ] = useState('back')
  const [ isCameraReady, setIsCameraReady ] = useState(false)
  const [ previews, setPreviews ] = useState([])
  const [ uploading, setUploading ] = useState(false)
  const [ cameraError, setCameraError ] = useState(null)
  const [ showInstructions, setShowInstructions ] = useState(true)
  const [ flashMode, setFlashMode ] = useState('off')
  const [ zoom, setZoom ] = useState(0.5)
  
  const cameraRef = useRef()
  
  let timer = undefined

  useEffect(() => {
	(async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		// const { status } = await askAsync(CAMERA)
		setHasPermission(status === 'granted')
	})()

	timer = setTimeout(stopTimer, 3000)
  }, [])

  const toggleFlash = () => {
	if (flashMode === 'on') setFlashMode('off')
	else setFlashMode('on')
  }

  const stopTimer = () => {
	clearTimeout(timer)
	timer = undefined
	setShowInstructions(false)
  }

  useEffect(() => {
	(async () => {
	  if (cameraRef.current && isCameraReady) {
		if (uploading) await cameraRef.current.pausePreview()
		else await cameraRef.current.resumePreview()
	  }
	})()
  }, [uploading])

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

  const closeAndClear = async () => {
	if (previews.length) setPreviews([])
	else clearModal()
  }

  const onBip = async bip => {
	addBip(bip)
	clearModal()
  }

  if (hasPermission === null) {
	return <View />
  }

  const onCameraReady = async () => {
	const isAvailable = await Camera.isAvailableAsync()
	if (isAvailable) setIsCameraReady(true)
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

  return (
	<SafeAreaView
		style={{
			flex: 1,
			width: '100%',
		}}
	>
		<View style={{ flex: 1 }}>

			{!cameraError && (

				<View
					style={{
						flex: 1,
						position: 'relative',
						width: '100%',
						// maxWidth: 400,
						// maxHeight: 600,
						// height: 300,
						marginHorizontal: 'auto',
					}}
				>
					<Camera
						ref={cameraRef}
						style={{
							// ...StyleSheet.absoluteFillObject,
							position: 'absolute',
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
							zIndex: 1,
						}}
						type={cameraType}
						flashMode={flashMode}
						zoom={zoom}
						onCameraReady={onCameraReady}
						onMountError={handleMountError}
					/>

					<Pressable
						disabled={!isCameraReady || uploading}
						onPress={takePicture}
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
							bottom: 0,
							left: 0,
							zIndex: 100,
						}}
					/>
					
					<Pressable
						onPress={clearModal}
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
							zIndex: 200,
							padding: 10, 
						}}
					>
						<Icon
							name='close-sharp'
							size={30}
							color='#fff'
						/>
					</Pressable>

					{showInstructions && (
						<View
							style={{
								position: 'absolute',
								top: '25%',
								left: 20,
								right: 20,
								height: 50,
								backgroundColor: 'rgba(255, 255, 255, 0.3)',
								borderRadius: 25,
								justifyContent: 'center',
								zIndex: 10,
							}}
						>
							<View
								style={{
									flex: 1,
									flexBasis: 'auto',
									flexDirection: 'row',
									alignItems: 'center',
									width: '100%',
									// position: 'absolute',
									// top: 70,
									// left: 0,
									// right: 0,
								}}
							// 	style={{
							// 	}}
							>
								<ThemedText
									size={20}
									color='#fff'
									align='center'
									bold
									style={{ width: '100%' }}
								>
									Tap screen to capture image
								</ThemedText>
							</View>
						</View>
					)}
				</View>	
			)}
		</View>

		{/* <View
			// style={{ marginVertical: 10 }}
		>
			<Slider
				zoom={zoom}
				onValueChange={setZoom}
			/>

		</View> */}

		<View
			style={{
				position: 'absolute',
				bottom: 20,
				left: 10,
				right: 10,
				flex: 1,
				flexDirection: 'row',
				padding: 10,
				
			}}
		>
			<BipPreview
				images={previews}
				onBip={onBip}
				onClear={closeAndClear}
				onRemove={removePreview}
				setUploading={setUploading}
			/>
		</View>
	  
		{cameraError && (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<BigRoundButton
					disabled={uploading}
					onPress={launchFileSelector}
				/>
			</View>
		)}
	</SafeAreaView>
  )
}

const BigRoundButton = ({ disabled, onPress }) => (
	<Pressable
		onPress={onPress}
		disabled={disabled}
		style={{
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			height: 100,
			width: 100,
			borderRadius: 50,
			background: disabled ? '#ccc' : 'tomato',
			textAlign: 'center',
			marginHorizontal: 'auto',
		}}
	>
		<View
			style={{
				justifyContent: 'center',
				marginTop: -10,
			}}
		>
			<Icon
				name='camera-sharp'
				size={30}
				color={'#fff'}
				style={{ marginHorizontal: 'auto' }}
			/>

			<ThemedText
				bold
				size={14}
				textAlign='center'
				color='#fff'
				style={{ marginTop: -5 }}
			>
				Add Image
			</ThemedText>

		</View>
	</Pressable>
)