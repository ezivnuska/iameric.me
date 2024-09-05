import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
	Animated,
	Pressable,
	SafeAreaView,
	View,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Camera, FlashMode } from 'expo-camera'
import { BipPreview } from './components'
import {
	ActivityIndicator,
	Slider,
	ThemedText,
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
  const [ isCameraReady, setIsCameraReady ] = useState(false)
  const [ containerHeight, setContainerHeight ] = useState(null)
  const [ previews, setPreviews ] = useState([])
  const [ uploading, setUploading ] = useState(false)
  const [ cameraError, setCameraError ] = useState(null)
  const [ showInstructions, setShowInstructions ] = useState(true)
  const [ flashMode, setFlashMode ] = useState(FlashMode.off)
  const [ zoom, setZoom ] = useState(0.5)

  const cameraRef = useRef()

  const transition = useRef(new Animated.Value(1)).current

  const animate = () => {
		Animated.timing(transition, {
			toValue: 0,
			duration: 3000,
			useNativeDriver: true,
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
			style={{
				flex: 1,
				// height: dims.height,
				backgroundColor: '#000',
				justifyContent: 'flex-start',
			}}
		>
			
			{/* {!isCameraReady && <ActivityIndicator color='#fff' />} */}
			
			<View
				// onLayout={e => setContainerHeight(e.nativeEvent.target.clientHeight)}
				style={{
					// flex: 1,
					flexBasis: 'auto',
					flexGrow: 1,
					flexShrink: 1,
					borderWidth: 1,
					borderColor: 'yellow',
				}}
			>
				{dims && (
					<Animated.View
						style={{
							height: transition.interpolate({
								inputRange: [0, 1],
								outputRange: [0, dims.height * 0.6],
							}),
							// flexShrink: 1,
							width: '100%',
							opacity: transition,
						}}
					>
						{!cameraError ? (
							<View
								style={{
									flex: 1,
									// flexGrow: 1,
									// flexShrink: 1,
									width: '100%',
									// height: 'auto',
									borderWidth: 1,
									borderColor: 'pink',
								}}
							>

								{isFocused && (
									<View
										style={{
											flex: 1,
											width: '100%',
											// height: '100%',
											borderWidth: 1,
											position: 'relative',
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
												// background: 'green',
											}}
										>
											<Pressable
												onPress={toggleFlash}
												// style={{}}
											>
												<Icon
													name={flashMode === FlashMode.on ? 'flash-sharp' : 'flash-off-sharp'}
													size={24}
													color='#fff'
												/>
											</Pressable>
											
											<Pressable
												onPress={handleClose}
												// style={{}}
											>
												<Icon
													name='close-sharp'
													size={30}
													color='#fff'
												/>
											</Pressable>
										</View>

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
												disabled={!isCameraReady || uploading}
												style={{
													marginHorizontal: 'auto',
													width: 50,
													height: 50,
													borderRadius: 25,
													overflow: 'hidden',
													borderWidth: 3,
													borderColor: '#fff',
													backgroundColor: (!isCameraReady || uploading) ? '#ccc' : 'tomato',
												}}
											/>
										</View>

									</View>
								)}
							</View>
						)
						: (
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
					</Animated.View>
				)}

				{/* <View
					// style={{ marginVertical: 10 }}
				>
					<Slider
						zoom={zoom}
						onValueChange={setZoom}
					/>

				</View> */}
			</View>

			<View
				style={{
					// flex: 1,
					flexBasis: 'auto',
					flexGrow: 1,
					// flexShrink: 0,
					// flexBasis: 'auto',
					backgroundColor: '#000',
					minHeight: '40%',
				}}
			>
				<BipPreview
					images={previews}
					onBip={onBip}
					onSubmission={onSubmission}
					onRemove={removePreview}
					setUploading={setUploading}
				/>
			</View>
		</View>
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