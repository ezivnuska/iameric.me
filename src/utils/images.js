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
import axios from 'axios'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export const loadImages = async (dispatch, userId) => {
    
    dispatch({ type: 'SET_LOADING', loading: 'Fetching images...' })
    
    const { data } = await axios.get(`/api/user/images/${userId}`)
    
    if (!data) {
        console.log('Error fetching user images.')
    } else {
        console.log('data.images', data.images)
        dispatch({ type: 'UPDATE_USER_IMAGES', userId, images: data.images })
    }

    dispatch({ type: 'SET_LOADING', loading: null })

    return data.images
}

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

export const getMaxAvailableImageSize = (dims, width, height) => {
    let maxHeight = dims.height - 100
    let maxWidth = dims.width - 100

    const isLandscape = dims.width > dims.height

    let imageHeight = height
    let imageWidth = width

    let scale = 1

    if (isLandscape) {
        if (imageWidth > imageHeight) {
            if (imageWidth > maxWidth) {
                scale = maxWidth / imageWidth 
                imageWidth = maxWidth
                imageHeight *= scale
            }
            if (imageHeight > maxHeight) {
                scale = maxHeight / imageHeight
                imageHeight = maxHeight
                imageWidth *= scale
            }
        } else {
            if (imageHeight > maxHeight) {
                scale = maxHeight / imageHeight
                imageHeight = maxHeight
                imageWidth *= scale
            }
            if (imageHeight > maxHeight) {
                scale = maxWidth / imageWidth
                imageWidth = maxWidth
                imageHeight *= scale
            }
        }
    }
    // if (imageHeight === imageWidth) {
    //     if (imageWidth > maxWidth || imageHeight > maxHeight) {
    //         imageWidth
    //     }
    // }
    
    return {
        width: imageWidth,
        height: imageHeight,
    }
}