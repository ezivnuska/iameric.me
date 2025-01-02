import React, { useMemo } from 'react'
import { Image, View } from 'react-native'
import { useApp } from '@context'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ProfileImage = ({ user, size = 'auto' }) => {

    const { theme } = useApp()
    
    const source = useMemo(() => user?.profileImage
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`,
    [user])

    return source && (
        <View
            style={{
                flexGrow: 0,
                width: size,
                height: size,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme?.colors.textDefault,
                overflow: 'hidden',
            }}
        >
            <Image
                source={source}
                resizeMode='cover'
                style={{
                    width: size,
                    height: size,
                }}
            />
        </View>
    )
}

export default ProfileImage