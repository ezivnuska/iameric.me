const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default getMaxImageDims = (w, h, dims) => {
    const landscape = dims.width > dims.height
    const maxHeight = landscape ? dims.height - 30 : dims.height / 2
    // const maxWidth = dims.width > 400 ? 400 : dims.width
    const maxWidth = dims.width > 400 ? 400 : dims.width - 20
    // console.log('w/h', w, h)
    // console.log('maxWidth', maxWidth)
    // console.log('maxHeight', maxHeight)
    let scale = 1
    let width = w
    let height = h
    if (width >= height) {// if landscape
        if (width > maxWidth) {
            scale = maxWidth / width
            width *= scale
            height *= scale
        }
        if (height > maxHeight) {
            scale = maxHeight / height
            width *= scale
            height *= scale
        } 
    } else {// if portrait
        if (height > maxHeight) {
            scale = maxHeight / height
            width *= scale
            height *= scale
        }
        if (width > maxWidth) {
            scale = maxWidth / width
            width *= scale
            height *= scale
        }
    }
    // console.log('width/height', width, height)
    return { width, height }
}