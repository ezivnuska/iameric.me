export default getMaxAvailableImageSize = (dims, width, height) => {
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