export default getMaxImageDims = (w, h, maxW) => {
    let scale = 1
    let width = w
    let height = h
        if (w > maxW) {
            scale = maxW / w
            width = maxW
            height *= scale
        }
    
    return { width, height }
}