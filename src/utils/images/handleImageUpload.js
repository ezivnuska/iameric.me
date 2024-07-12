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

    const MAX_WIDTH = 400

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

    const THUMB_WIDTH = 100

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

export default handleImageUpload = async (userId, image, srcOrientation) => {
    const imageData = await getImageData(image, srcOrientation)
    const thumbData = await getThumbData(image, srcOrientation)
    const filename = `${userId}-${Date.now()}.png`

    return {
        imageData: { ...imageData, filename },
        thumbData: { ...thumbData, filename },
        userId,
    }
}