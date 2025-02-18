import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Paths } from '@constants'

const UserAvatar = ({ user, size = 50, onPress = null, ...props }) => {

    const [source, setSource] = useState(null)

    useEffect(() => {
        setSource(user?.profileImage ? `${Paths.ASSETS}/${user.username}/${user.profileImage.filename}` : null)
    }, [user])

    return (
        <Pressable
            {...props}
            onPress={onPress}
            disabled={!onPress}
        >
            {source
                ? <Avatar.Image size={size} source={source} style={{ margin: 0, padding: 0 }} />
                : <Avatar.Icon size={size} icon='guy-fawkes-mask' style={{ margin: 0, padding: 0 }} />
            }
        </Pressable>
    )
}

export default UserAvatar