export default getMaxImageDims = (w, h, maxW, maxH) => {
    const landscape = w > h
    const maxHeight = landscape ? maxH : maxH - 120
    const maxWidth = maxW > 350 ? 350 : maxW
    let scale = 1
    let width = w
    let height = h
    if (width >= height) {// if landscape
        if (width > maxWidth) {
            scale = maxWidth / width
            width = maxWidth
            height *= scale
        }
        if (height > maxHeight) {
            height = maxHeight
            scale = maxHeight / height
            width *= scale
        }
    } else {// if portrait
        if (height > maxHeight) {
            height = maxHeight
            scale = maxHeight / height
            width *= scale
        }
        if (width > maxWidth) {
            width = maxWidth
            scale = maxWidth / width
            height *= scale
        }
    }
    
    return { width, height }
}