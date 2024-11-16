import { Platform } from 'react-native'
import {
    launchCameraAsync,
    requestCameraPermissionsAsync,
} from 'expo-image-picker'
import { uploadAsync } from 'expo-file-system'

const launchCamera = async () => {
    let permissionResult = await requestCameraPermissionsAsync()
    if (permissionResult.status !== 'granted') {
        console.log('Permission to access camera is required!')
        alert('Permission to access camera is required!')
        return null
    }

    let cameraResult = await launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
    })
    
    if (!cameraResult.canceled) {
        // console.log('cameraResult', cameraResult)

        return cameraResult.assets[0].uri
    } else return null
}

const openCamera = async () => {
    let uri = await launchCamera()
    // if (Platform.OS === 'web') uri = await openImageSelector()
    // else uri = await openImagePickerAsync()
    return uri
}

export default openCamera