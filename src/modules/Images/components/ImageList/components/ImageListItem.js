import React, { useEffect, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { useApp } from '@app'
import { useModal } from '@modal'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'


export default ImageListItem = ({ image, size }) => {

    const {
        dims,
        theme,
        user,
    } = useApp()
    
    const { setModal } = useModal()

    // const imageGap = 5

    // const numImagesPerRow = 4
    // const [imageSize, setImageSize] = useState((dims.width - (20 + numImagesPerRow * (imageGap - 1))) / numImagesPerRow)

    // useEffect(() => {
    //     if (dims) {
    //         let dimWidth = dims.width
    //         if (dimWidth > 400) dimWidth = 400
    //         setImageSize((dimWidth - (numImagesPerRow * (imageGap - 1))) / numImagesPerRow)
    //     }
    // }, [dims])

    const buttonStyle = {
        borderWidth: 1,
        borderColor: theme?.colors.border,
        shadowColor: theme?.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: theme?.colors.background,
    }

    return (
        // <Pressable
        //     key={`image-${index}`}
        //     onPress={() => setModal('IMAGE', image)}
        //     disabled={loading}
        //     style={[
        //         {
        //             flexBasis: 'auto',
        //             width: imageSize,
        //             height: imageSize,
        //         },
        //         buttonStyle,
        //     ]}
        // >
        <Image
            width={size}
            height={size}
            source={{ uri: `${IMAGE_PATH}/${user.username}/thumb/${image.filename}` }}
            style={{
                resizeMode: 'cover',
                width: '100%',
                height: '100%',
            }}
        />

    )
}