// import {
//     useWindowDimensions,
//  } from 'react-native'

// const dims = useWindowDimensions()

// const guidelineBaseWidth = 375
// const guidelineBaseHeight = 812

// const horizontalScale = size => (dims.width / guidelineBaseWidth) * size
// const verticalScale = size => (dims.height / guidelineBaseHeight) * size
// const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor

const getSize = dims => {
    const orientation = getOrientation(dims)
    if (dims.width <= 540 || orientation === 'portrait') return 'small'
    else if (dims.width <= 712) return 'medium'
    else return 'large'
}

const getOrientation = dims => {
    let orientation = 'portrait'
    if (dims.width > dims.height) return 'landscape'
    return orientation
}

export {
    getSize,
    getOrientation,
    // horizontalScale,
    // verticalScale,
    // moderateScale,
}