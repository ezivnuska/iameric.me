const getMaxImageDims = (imageWidth, imageHeight, maxDims) => {

    let scale = 1

    let width = imageWidth
    let height = imageHeight

    const isPortrait = height > width

    if (isPortrait) {
        
        if (height > maxDims.height) {
            scale = maxDims.height / height
            height = maxDims.height
            width *= scale
        }
        
        if (width > maxDims.width) {
            scale = maxDims.width / width
            width = maxDims.width
            height *= scale
        }

    } else {
        
        if (width > maxDims.width) {
            scale = maxDims.width / width
            width = maxDims.width
            height *= scale
        }

        if (height > maxDims.height) {
            scale = maxDims.height / height
            height = maxDims.height
            width *= scale
        }
    }
    
    
    return { width, height }
}

export default getMaxImageDims