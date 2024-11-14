import { Platform } from 'react-native'
import {
    launchImageLibraryAsync,
    requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import { uploadAsync } from 'expo-file-system'

const openImageSelector = async () => {
    
    // let options = {
    //   title: 'You can choose one image',
    //   maxWidth: 256,
    //   maxHeight: 256,
    //   storageOptions: {
    //     skipBackup: true
    //   }
    // }
    
    const data = await launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
    })
    console.log('data from image selector', data)
    if (!data || data.canceled) console.log('image selection cancelled')
    else return data.assets[0].uri
    return null
}

const openImagePickerAsync = async () => {
    let permissionResult = await requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!')
        return null
    }

    let pickerResult = await launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
    })
    
    if (!pickerResult.canceled) {
        const uploadResult = await uploadAsync('/api/upload/avatar', pickerResult.uri, {
            httpMethod: 'POST',
            // uploadType: FileSystemUploadType.MULTIPART,
            fieldName: 'file'
        })

        return uploadResult.assets[0].uri
    } else return null
}

const openFileSelector = async () => {
    let uri = null
    if (Platform.OS === 'web') uri = await openImageSelector()
    else uri = await openImagePickerAsync()
    return uri
}

export default openFileSelector