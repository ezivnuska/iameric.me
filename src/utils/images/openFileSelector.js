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

    
    if (!data) {
        console.log('no image selected')
    } else if (data.canceled) {
        console.log('image selection canceled')
    } else {
        return data.assets[0].uri
    }

    return false
}

const openImagePickerAsync = async () => {
    let permissionResult = await requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!')
        return false
    }

    let pickerResult = await launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
    })
    
    console.log('pickerResult', pickerResult)

    if (!pickerResult.canceled) {
        const uploadResult = await uploadAsync('/api/upload/avatar', pickerResult.uri, {
            httpMethod: 'POST',
            // uploadType: FileSystemUploadType.MULTIPART,
            fieldName: 'file'
        })

        if (uploadResult) {
            return uploadResult?.assets[0].uri
        }
    }
    return false
}

const openFileSelector = async () => {
    let uri = false
    console.log('Platform:', Platform.OS)
    if (Platform.OS === 'web') {
        // console.log('opening ImageSelector')
        uri = await openImageSelector()
    } else {
        // console.log('opening ImagePickerAsync')
        uri = await openImagePickerAsync()
    }
    
    return uri
}

export default openFileSelector