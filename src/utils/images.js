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
import EXIF from 'exif-js'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export const getImageDims = (w, h, dims) => {
    const landscape = dims.width > dims.height
    const maxHeight = landscape ? dims.height - 30 : dims.height / 2
    let maxWidth = landscape ? (dims.width * 0.5) : dims.width - 20
    if (maxWidth > 300) maxWidth = 300
    // console.log('w/h', w, h)
    // console.log('maxWidth', maxWidth)
    // console.log('maxHeight', maxHeight)
    let scale = 1
    let width = w
    let height = h
    if (width >= height) {// if landscape
        if (width > maxWidth) {
            scale = maxWidth / width
            width *= scale
            height *= scale
        }
        if (height > maxHeight) {
            scale = maxHeight / height
            width *= scale
            height *= scale
        } 
    } else {// if portrait
        if (height > maxHeight) {
            scale = maxHeight / height
            width *= scale
            height *= scale
        }
        if (width > maxWidth) {
            scale = maxWidth / width
            width *= scale
            height *= scale
        }
    }
    // console.log('width/height', width, height)
    return { width, height }
}

export const loadImages = async userId => {
    
    const { data } = await axios.get(`/api/user/images/${userId}`)
    
    if (!data) {
        console.log('Error fetching user images.')
    }

    return data.images
}

export const loadUnknownImage = async (imageId) => {
    const { data } = await axios.get(`/api/image/${imageId}`)
    if (!data) console.log('Error fetching image.')
    else return data
    return null
}

export const loadUserImage = async imageId => {    
    const image = await axios.get(`/api/image/${imageId}`)
    if (!image) console.log('Error fetching user image.')
    else return image
    return null
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
    
    if (!data || data.canceled) console.log('image selection cancelled')
    else return data.assets[0].uri
    return null
  }

 export const openFileSelector = async () => {
    let uri = null
    if (Platform.OS === 'web') uri = await openImageSelector()
    else uri = await openImagePickerAsync()
    return uri
}

export const getImageDataById = async id => {
    const { data } = await axios
        .get(`/api/image/${id}`)
    if (!data) console.log('error getting image data')
    else return data
    return null
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

    const landscape = dims.width > dims.height

    let imageHeight = height
    let imageWidth = width

    let scale = 1

    if (landscape) {
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

export const handleImageUpload = async (userId, image, srcOrientation) => {
    const imageData = await getImageData(image, srcOrientation)
    const thumbData = await getThumbData(image, srcOrientation)
    const filename = `${userId}-${Date.now()}.png`

    return {
        imageData: { ...imageData, filename },
        thumbData: { ...thumbData, filename },
        userId,
    }
}

const getImageData = async (image, srcOrientation) => {
    
    const { height, width } = image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let imageWidth = width
    let imageHeight = height

    if (srcOrientation > 4 && srcOrientation < 9) {
        imageWidth = height
        imageHeight = width
    }

    const MAX_WIDTH = 340

    if (imageWidth >= MAX_WIDTH) {
        imageWidth = MAX_WIDTH
        imageHeight *= MAX_WIDTH / width
    }

    canvas.width = imageWidth
    canvas.height = imageHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    const imageURI = canvas.toDataURL('image/png:base64;')

    return {
        height: imageHeight,
        width: imageWidth,
        uri: imageURI,
    }
}

const getThumbData = async (image, srcOrientation) => {
    
    const { height, width } = image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let imageWidth = width
    let imageHeight = height

    if (srcOrientation > 4 && srcOrientation < 9) {
        imageWidth = height
        imageHeight = width
    }

    const THUMB_WIDTH = 50

    if (imageWidth >= THUMB_WIDTH) {
        imageWidth = THUMB_WIDTH
        imageHeight *= THUMB_WIDTH / width
    }

    canvas.width = imageWidth
    canvas.height = imageHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    const imageURI = canvas.toDataURL('image/png:base64;')

    return {
        height: imageHeight,
        width: imageWidth,
        uri: imageURI,
    }
}

export const uploadImageData = async imageData => {
    const { data } = await axios.post(`/api/image/upload`, imageData)
    if (!data || !data.image) console.log('Error uploading image/thumb')
    else return data.image
    return null
}

export const handleImageData = async (image, srcOrientation, userId) => {
    const imageData = await getImageData(image, srcOrientation)
    const thumbData = await getThumbData(image, srcOrientation)
    const filename = `${userId}-${Date.now()}.png`

    return {
        imageData: { ...imageData, filename },
        thumbData: { ...thumbData, filename },
        userId,
    }
}

export const deleteImage = async (imageId, isProductImage, isProfileImage) => {
    const { data } = await axios.post('/api/images/delete', {
        imageId,
        isProductImage,
        isProfileImage,
    })
    
    if (!data || !data.deletedImage) console.log('error deleting image.')
    else return data.deletedImage
    return null
}

export const setImageAsAvatar = async (imageId, userId) => {
    const { data } = await axios.post('/api/user/avatar', { imageId, userId })
    if (!data || !data) console.log('error setting image as avatar')
    else return data
    return null
}