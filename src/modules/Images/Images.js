import React from 'react'
import { View } from 'react-native'
import {
    ImageList,
    ImagesModal,
    UserHeader,
    useImages,
} from '.'
import { useUser } from '@user'

const Images = props => {

    const {
        imagesModal,
        closeImagesModal,
        setImagesModal,
    } = useImages()

    const {
        user,
    } = useUser()
    
    return (
        <View>

            <UserHeader username={user.username} {...props} />

            <ImageList
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