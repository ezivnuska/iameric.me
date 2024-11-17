import React from 'react'
import { View } from 'react-native'
import { ImagesModal, useImages } from '.'
import { ImageList } from '@components'

const Images = () => {

    const {
        images,
        imagesModal,
        uploading,
        closeImagesModal,
        setImagesModal,
    } = useImages()
    
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <ImageList
                images={images}
                onPress={(type, data) => setImagesModal(type, data)}
                uploading={uploading}
                allowUpload
            />
    
            <ImagesModal
                modal={imagesModal}
                onCancel={closeImagesModal}
            />
        </View>
    )
}

export default Images