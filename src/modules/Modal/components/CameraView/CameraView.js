import React, { useEffect, useRef, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import {
  Camera,
} from 'expo-camera'
import {
  BipPreview,
} from './components'
import { ThemedText } from '@components'
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

  const { user, theme } = useApp()
  const { addBip } = useBips()
  const { clearModal, closeModal } = useModal()

  const [ hasPermission, setHasPermission ] = useState(null)
  const [ cameraType, setCameraType ] = useState('back')
  const [ isCameraReady, setIsCameraReady ] = useState(false)
  const [ previews, setPreviews ] = useState([])
  const [ uploading, setUploading ] = useState(false)
  const [ cameraError, setCameraError ] = useState(null)
  
  const cameraRef = useRef()

  useEffect(() => {
	(async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		setHasPermission(status === 'granted')
	})()
  }, [])

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
	  ...previews,
	  selectedImage,
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
		else addPreview(data)
	  }
	  image.src = src
  }

  const takePicture = async () => {
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
	else closeModal()
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

	  {!cameraError && (
		<View
		  style={{
			flex: 1,
			width: '100%',
			flexDirection: 'row',
		  }}    
		>
		  <View style={{ flex: 1 }}>
			<Camera
			  ref={cameraRef}
			  style={{
				flex: 1,
				width: '100%',
				...StyleSheet.absoluteFillObject,
				borderWidth: 1,
			  }}
			  type={cameraType}
			  // flashMode={Camera.Constants.FlashMode.on}
			  onCameraReady={onCameraReady}
			  onMountError={handleMountError}
			/>
		  </View>
		  <View
			style={{
			  flexBasis: 50,
			  flexGrow: 0,
			  flexDirection: 'column',
			}}
		  >
			<View
			  style={{
				flex: 1,
				width: 50,
			  }}
			>
			  <Pressable
				onPress={() => closeModal()}
				disabled={uploading}
				style={{
				  flexDirection: 'row',
				  justifyContent: 'center',
				  opacity: uploading ? 0.5 : 1,
				}}
			  >
				<Icon
				  name='close-sharp'
				  size={35}
				  color={theme?.colors.textDefault}
				  style={{ paddingBottom: 5 }}
				/>
			  </Pressable>
			</View>
		  
			<View
			  style={{
				flex: 5,
				width: 50,
			  }}
			>
			  <Pressable
				disabled={!isCameraReady || uploading}
				onPress={takePicture}
				style={{
				  flex: 1,
				  flexDirection: 'row',
				  justifyContent: 'center',
				  alignItems: 'center',
				  background: uploading ? '#aaa' : 'tomato',
				  borderRadius: 10,
				  marginHorizontal: 2,
				}}
			  >
				<Icon
				  name='aperture-sharp'
				  size={35}
				  color='#fff'
				  style={{ paddingBottom: 5 }}
				/>
			  </Pressable>
			</View>
		  </View>
		</View>
	  )}

		<View
			style={{
				flex: 1,
				flexDirection: 'row',
				padding: 10,
			}}
		>
			<BipPreview
				images={previews}
				onBip={onBip}
				onClear={closeAndClear}
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