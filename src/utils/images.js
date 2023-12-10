import {
    Platform,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

export const openImagePickerAsync = async () => {
    
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!')
        return null
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    
    if (!pickerResult.canceled) {
        const uploadResult = await FileSystem.uploadAsync('/api/upload/avatar', pickerResult.uri, {
            httpMethod: 'POST',
            // uploadType: FileSystemUploadType.MULTIPART,
            fieldName: 'file'
        })

        return uploadResult.assets[0].uri
    }

    return null
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
    
    const data = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        quality: 1,
    })

    if (!data) return null

    const { canceled, assets } = data
    
    if (canceled) return null
    
    return assets[0].uri
  }