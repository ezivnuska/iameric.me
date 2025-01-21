import React, { useEffect, useMemo, useState } from 'react'
import { Image, View } from 'react-native'
import { useTheme } from '@context'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserAvatar = ({ user, size = 'auto' }) => {

    const { theme } = useTheme()

    // const profileImage = useMemo(() => user && user.profileImage, [user])

    // const source = useMemo(() => {
    //     if (profileImage?.filename) {
    //         return `${IMAGE_PATH}/${user.username}/${profileImage.filename}`
    //     } else {
    //         return `${IMAGE_PATH}/avatar-default.png`
    //     }
    // }, [profileImage])

    const [source, setSource] = useState(`${IMAGE_PATH}/avatar-default.png`)

    useEffect(() => {
        if (user && user.profileImage?.filename) {
            setSource(`${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`)
        }
    }, [user])

    return (
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

export default UserAvatar