import React, { useEffect, useMemo, useState } from 'react'
// import { Image, View } from 'react-native'
import { Avatar } from 'react-native-paper'
// import { useTheme } from '@context'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserAvatar = ({ user, size = 50 }) => {

    // const { theme } = useTheme()

    const [source, setSource] = useState(null)

    useEffect(() => {
        if (user && user.profileImage?.filename) {
            setSource(`${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`)
        }
    }, [user])

    return source
        ? <Avatar.Image size={size} source={source} />
        : <Avatar.Icon size={size} icon='guy-fawkes-mask' />
}

export default UserAvatar