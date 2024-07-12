export default getMaxAvailableImageSize = (dims, width, height) => {
    // let maxHeight = dims.height / 2
    // let maxWidth = dims.width / 2
    let maxHeight = 200
    let maxWidth = 200

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
    } else {
        if (imageHeight > imageWidth) {
            if (imageHeight > maxHeight) {
                scale = maxHeight / imageHeight 
                imageHeight = maxHeight
                imageWidth *= scale
            }
            if (imageWidth > maxWidth) {
                scale = maxWidth / imageWidth
                imageWidth = maxWidth
                imageHeight *= scale
            }
        } else {
            if (imageWidth > maxWidth) {
                scale = maxWidth / imageWidth
                imageWidth = maxWidth
                imageHeight *= scale
            }
            if (imageWidth > maxWidth) {
                scale = maxHeight / imageHeight
                imageHeight = maxHeight
                imageWidth *= scale
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