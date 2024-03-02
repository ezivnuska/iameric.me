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

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

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

        return uploadResult.assets[0].uri
    } else return null
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
    
    if (!data || data.canceled) return null

    return data.assets[0].uri
  }

 export const openFileSelector = async () => {
    let uri = null
    
    if (Platform.OS === 'web') uri = await openImageSelector()
    else uri = await openImagePickerAsync()

    return(uri)
}

export const getImageDataById = async id => {
    
    const { data } = await axios
        .get(`/api/image/${id}`)
    
    return data
}

export const getProfileImagePathFromUser = user => {
    const { profileImage, username } = user
    const filename = profileImage?.filename
    return filename
        ? `${IMAGE_PATH}/${username}/${filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`
}