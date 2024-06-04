import React from 'react'
import {
    Image,
    View,
} from 'react-native'
import {
    useApp,
} from '@context'
import {
    getMaxImageDims,
} from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const MAX_IMAGE_HEIGHT = 120

const UserDetailsImage = ({ image, username }) => {

    const { dims } = useApp()
    // const { profileImage, username } = profile

    const filename = (image && image.filename)
        ? image.filename
        : null

    if (!image) return null
    
    const source = image
        ? `${IMAGE_PATH}/${username}/${filename}`
        : `${IMAGE_PATH}/avatar-default.png`

    const { width, height } = image
        ? getMaxImageDims(image.width, image.height, dims)
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

export default () => {

    const { profile } = useApp()

    return profile && (
        <View>
            <UserDetailsImage image={profile.profileImage} username={profile.username} />
        </View>
    )
}