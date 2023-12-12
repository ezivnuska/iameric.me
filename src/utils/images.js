import {
    Platform,
} from 'react-native'
import {
    launchImageLibraryAsync,
    requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import {
    uploadAsync,
} from 'expo-file-system'

export const openImagePickerAsync = async () => {
    
    let permissionResult = await requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!')
        return null
    }

    let pickerResult = await launchImageLibraryAsync()
    
    if (!pickerResult.canceled) {
        const uploadResult = await uploadAsync('/api/upload/avatar', pickerResult.uri, {
            httpMethod: 'POST',
            // uploadType: FileSystemUploadType.MULTIPART,
            fieldName: 'file'
        })

        return uploadResult
    }

    return pickerResult
}

export const openImageSelector = async () => {
    
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
    
    if (!data) return null

    return data
  }

 export const openFileSelector = async () => {
    let image = null
    
    if (Platform.OS === 'web') image = await openImageSelector()
    else image = await openImagePickerAsync()

    return(image.assets[0].uri)
}