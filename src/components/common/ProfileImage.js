import React, { useEffect, useMemo } from 'react'
import { Image, View } from 'react-native'
import { useApp, useUser } from '@context'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ProfileImage = ({ user, size = 'auto' }) => {

    const { theme } = useApp()
    const { findUserById } = useUser()
    
    const profile = useMemo(() => user && findUserById(user._id), [user])
    const source = useMemo(() => profile?.profileImage
        ? `${IMAGE_PATH}/${profile.username}/${profile.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`,
    [profile])

    // useEffect(() => {
    //     console.log('Profile', profile)
    // }, [profile])

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