import React from 'react'
import {
    Image,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import {
    useApp,
} from '@context'
import {
    getMaxImageDims,
} from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'

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

const AvailableCheckbox = ({ checked, onChange }) => {
    const { theme } = useApp()
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <Icon
                name={checked ? 'ellipse' : 'ellipse-outline'}
                size={24}
                onPress={() => onChange(!checked)}
                color={theme?.colors.textDefault}
            />
            <ThemedText>Available</ThemedText>
        </View>
    )
}

export default ({ profile, toggleStatus }) => (
    <View>
        <UserDetailsImage image={profile.profileImage} username={profile.username} />
        <AvailableCheckbox checked={profile.available} onChange={toggleStatus} />
    </View>
)