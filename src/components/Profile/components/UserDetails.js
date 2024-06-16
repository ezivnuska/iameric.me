import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    DepositForm,
} from './'
import { ThemedText } from '@components'
import {
    useApp,
} from '@context'
import {
    getMaxImageDims,
} from '@utils/images'
import Icon from 'react-native-vector-icons/Ionicons'
import { classes } from '@styles'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const MAX_IMAGE_HEIGHT = 120

const UserDetailsImage = ({ image, username }) => {

    const { dims, theme } = useApp()
    // const { profileImage, username } = profile

    const filename = (image && image.filename)
        ? image.filename
        : null

    if (!image) return null
    
    const source = image
        ? `${IMAGE_PATH}/${username}/${filename}`
        : `${IMAGE_PATH}/avatar-default.png`

    const getMaxDimsForWidth = (imageWidth, imageHeight, maxWidth) => {
        const orientationIsLandscape = imageWidth > imageHeight
        const imageNeedsConstraint = imageWidth > maxWidth
        if (!imageNeedsConstraint) return { width: imageWidth, height: imageHeight }
        let width = imageWidth
        let height = imageHeight
        let scale = 1
        if (orientationIsLandscape) {
            if (imageWidth > maxWidth) scale = maxWidth / imageWidth
            // else scale = maxHeight / imageHeight
        } else {
            if (imageHeight > maxHeight) scale = maxHeight / imageHeight
        }
        width = imageWidth * scale
        height = imageHeight * scale

        return { width, height }
    }
    
    const { width, height } = image
        ? getMaxDimsForWidth(image.width, image.height, dims.width / 2)
        // ? getMaxImageDims(image.width, image.height, dims)
        : { width: 200, height: 200 }

    return (
        <Image
            source={source}
            style={{
                width,
                height,
                resizeMode: 'cover',
                borderWidth: 1,
                borderColor: theme?.colors.textDefault,
            }}
        />
    )
}

const AvailableCheckbox = ({ checked, onChange }) => {
    const { theme } = useApp()
    return (
        <Pressable
            onPress={() => onChange(!checked)}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingVertical: 5,
            }}
        >
            <ThemedText>Available</ThemedText>
            <Icon
                name={checked ? 'ellipse' : 'ellipse-outline'}
                size={18}
                color={checked ? theme?.colors.statusOn : theme?.colors.textDefault}
            />
        </Pressable>
    )
}

export default ({ profile, toggleStatus }) => (
    <View>
        <View
            style={{
                flexDirection: 'row',
                gap: 15,
            }}
        >
            <UserDetailsImage image={profile.profileImage} username={profile.username} />
            <View>
                {/* <ThemedText style={classes.headerSecondary}>{profile.username}</ThemedText> */}
                <AvailableCheckbox checked={profile.available} onChange={toggleStatus} />
                <DepositForm user={profile} />
            </View>
        </View>
    </View>
)