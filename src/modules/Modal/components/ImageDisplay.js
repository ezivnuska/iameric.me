import React from 'react'
import {
    Image,
    Pressable,
} from 'react-native'
// import { useApp } from '@app'
import { useModal } from '@modal'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ImageDisplay = ({ image }) => {
    // const { user } = useApp()
    const { closeModal } = useModal()
    return (
        <Pressable
            onPress={() => closeModal()}
        >
             <Image
                source={{
                    uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}`,
                }}
                style={{
                    resizeMode: 'contain',
                    height: image.height,
                    width: image.width,
                    marginHorizontal: 'auto',
                }}
            />
        </Pressable>
    )
}