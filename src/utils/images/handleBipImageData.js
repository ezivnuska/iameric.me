const getImageData = async (image, srcOrientation, maxWidth = 400) => {
    // console.log('IMAGE', image)
    const { height, width } = image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let imageWidth = width
    let imageHeight = height

    if (srcOrientation > 4 && srcOrientation < 9) {
        imageWidth = height
        imageHeight = width
    }

    if (imageWidth >= maxWidth) {
        imageWidth = maxWidth
        imageHeight *= maxWidth / width
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

const handleBipImageData = async (userId, imageElement, srcOrientation = null) => {
    // console.log('imageElement----->', imageElement)
    const imageData = await getImageData(imageElement, srcOrientation, 400)
    const thumbData = await getImageData(imageElement, srcOrientation, 100)
    const filename = `${userId}-${Date.now()}.png`

    return {
        imageData,
        thumbData,
        filename,
        userId,
    }
}

export default handleBipImageData