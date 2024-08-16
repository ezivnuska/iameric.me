import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Camera,
  CameraType,
  useCameraPermissions,
  isAvailableAsync,
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
  const { closeModal } = useModal()

  const [ hasPermission, setHasPermission ] = useState(null)
  const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back)
  const [ isCameraReady, setIsCameraReady ] = useState(false)
  const [ hideCamera, setHideCamera ] = useState(false)
  const [ previews, setPreviews ] = useState([])
  
  const cameraRef = useRef()

  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === 'granted')
    })()
  }, [])

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  const addPreview = async selectedImage => {
    if (cameraRef.current) {
      await cameraRef.current.resumePreview()
    }
    setPreviews([
      ...previews,
      selectedImage,
    ])
  }
  
  const updatePreview = updatedItem => {
    setPreviews(previews.map((item, index) => {
        return index === previews.length - 1
            ? updatedItem
            : item
    }))
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
    // alert('taking picture')
    if (cameraRef.current) {
      const options = {
          quality: 0.5,
          base64: true,
          skipProcessing: true,
      }
      const source = await cameraRef.current.takePictureAsync(options)
      if (!source || !source.uri) alert('no source from camera')
      await cameraRef.current.pausePreview()

      await handleSelectedImage(source.uri)

      // addPreview(source)
    }
  }

  const closeAndClear = () => {
    setPreviews([])
    closeModal()
  }

  const onBip = async bip => {
    addBip(bip)
    closeAndClear()
  }

  if (hasPermission === null) {
    return <View />;
  }
//   if (hasPermission === false) {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.message}>We need your permission to show the camera</Text>
//             <Button onPress={requestPermission} title='grant permission' />
//         </View>
//     )
//   }

//   const toggleCameraFacing = () => {
//     setFacing(current => (current === 'back' ? 'front' : 'back'))
//   }

  const handleMountError = error => {
    launchFileSelector()
    setHideCamera(true)
  }

  const launchFileSelector = async () => {
    const uri = await openFileSelector()
    if (uri) {
        handleSelectedImage(uri)
    }
}

  return (
    <SafeAreaView
      // style={styles.container}
      style={{
        flex: 1,
        width: '100%',
      }}
    >

      {!hideCamera && (
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
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
                disabled={!isCameraReady}
                onPress={takePicture}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'tomato',
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
            <View
              style={{
                flex: 1,
                width: 50,
              }}
            />
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
          onClear={() => {
            setPreviews([])
            closeModal()
          }}
        />
      </View>
    </SafeAreaView>
    // <View style={styles.container}>
    //   <Camera
    //      style={styles.camera} facing={facing} ref={cameraRef}>
    //     {/* <View style={styles.buttonContainer}>
    //       <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
    //         <Text style={styles.text}>Flip Camera</Text>
    //       </TouchableOpacity>
    //     </View> */}
    //   </Camera>
    // </View>
  )
}