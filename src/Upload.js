import axios from 'axios'
import EXIF from 'exif-js'

export const dataURItoBlob = async dataURI =>  await (await fetch(dataURI)).blob()

export const uploadImage = async (userId, src) => {
    const image = new Image()

    image.onload = async () => {
        const timestamp = Date.now()
        const { imageURI, thumbURI } = imageToDataURIs(image)
        let id = await handleUpload(userId, imageURI, timestamp)
        if (!id) return null
        else return await handleUpload(userId, thumbURI, timestamp, 'thumb')
    }

    image.src = src
}

export const imageToDataURIs = image => {
    const canvas = document.createElement('canvas')
    
    const originalWidth = image.width

    let imageWidth = image.width
    let imageHeight = image.height
    let thumbWidth
    let thumbHeight

    const IMAGE_WIDTH = 200
    const THUMB_WIDTH = 50

    if (originalWidth > IMAGE_WIDTH) {
        imageWidth = IMAGE_WIDTH
        imageHeight *= IMAGE_WIDTH / originalWidth
    }

    thumbWidth = imageWidth * (THUMB_WIDTH / imageWidth)
    thumbHeight = imageWidth * (THUMB_WIDTH / imageWidth)

    canvas.width = imageWidth
    canvas.height = imageHeight

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, imageWidth, imageHeight)

    const imageURI = canvas.toDataURL('image/png;base64;')

    canvas.width = thumbWidth
    canvas.height = thumbHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, thumbWidth, thumbHeight)

    const thumbURI = canvas.toDataURL('image/png;base64;')

    return { imageURI, thumbURI }
}

export const handleUpload = async (userId, dataURI, timestamp, type = null) => {
    
    const { data } = await axios
        .post(`/api/image/upload`, {
            _id: userId,
            dataURI,
            timestamp,
            type,
        })
    
    if (!data) {
        console.log(`Error uploading image.${type ? ` (${type})` : ''}`)
        return null
    }
    
    return data.id
}