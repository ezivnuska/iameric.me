const getMaxImageDims = (imageWidth, imageHeight, maxDims) => {

    let scale = 1

    let width = imageWidth
    let height = imageHeight

    if (width > maxDims.width) {
        scale = maxDims.width / imageWidth
        width = maxDims.width
        height *= scale
    }

    // if (height > maxDims.height) {
    //     scale = maxDims.height / imageHeight
    //     width = maxDims.width
    //     height *= scale
    // }
    
    return { width, height }
}

export default getMaxImageDims