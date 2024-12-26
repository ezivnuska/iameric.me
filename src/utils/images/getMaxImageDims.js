const getMaxImageDims = (imageWidth, imageHeight, maxWidth = 600) => {

    let scale = 1

    let width = imageWidth
    let height = imageHeight

    if (width > maxWidth) {
        scale = maxWidth / imageWidth
        width = maxWidth
        height *= scale
    }
    
    return { width, height }
}

export default getMaxImageDims