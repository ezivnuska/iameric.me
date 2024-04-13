import React from 'react'
import {
    Image,
    useWindowDimensions,
} from 'react-native'
import { useUser } from '@context'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const MAX_IMAGE_HEIGHT = 120

export default () => {

    const dims = useWindowDimensions()

    const { profile } = useUser()

    const getImageDims = (w, h) => {
        let scale = 1
        let width = w
        let height = h
        if (w >= h) {// if landscape
            if (w > dims.width - 20) {
                scale = (dims.width - 20) / width
                width *= scale
                height *= scale
            }
        }
        if (h > MAX_IMAGE_HEIGHT) {
            scale = MAX_IMAGE_HEIGHT / height
            width *= scale
            height *= scale
        }

        return { width, height }
    }

    // TODO: clean this.
    const renderUserAvatar = () => {

        if (!profile) return null

        const { profileImage, username } = profile

        const filename = (profileImage && profileImage.filename)
            ? profileImage.filename
            : null
        
        const source = filename ?
            `${IMAGE_PATH}/${username}/${filename}` :
            `${IMAGE_PATH}/avatar-default.png`

        const { width, height } = profileImage
            ? getImageDims(profileImage.width, profileImage.height)
            : { width: 200, height: 200 }
        
        return (
            <Image
                source={source}
                style={{
                    width,
                    height,
                    resizeMode: 'cover',
                }}
            />
        )
    }

    return renderUserAvatar(profile)
}