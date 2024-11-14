import React from 'react'
import { View } from 'react-native'
import {
    ImageList,
    ImagesModal,
    useImages,
} from '.'

const Images = () => {

    const {
        images,
        imagesModal,
        closeImagesModal,
    } = useImages()
    
    return (
        <View>
            <ImageList images={images} />
    
            <ImagesModal
                modal={imagesModal}
                onCancel={closeImagesModal}
            />
        </View>
    )
}

export default Images