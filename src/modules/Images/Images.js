import React from 'react'
import { View } from 'react-native'
import { ImagesModal, useImages } from '.'
import { ImageList, UserHeader } from '@components'
import { useUser } from '@user'

const Images = props => {

    const { user } = useUser()

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
            <UserHeader user={user} route={props.route} />
            
            <ImageList
                images={images}
                onPress={(type, data) => setImagesModal(type, data)}
                uploading={uploading}
                upload={() => setImagesModal('IMAGE_UPLOAD')}
            />
    
            <ImagesModal
                modal={imagesModal}
                onCancel={closeImagesModal}
            />
        </View>
    )
}

export default Images