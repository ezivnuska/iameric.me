import React, { useMemo } from 'react'
import { Pressable } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Paths } from '@constants'

const SmartAvatar = ({ user, size = 50, onPress = null, ...props }) => {

    const source = useMemo(() => user?.profileImage ? `${Paths.ASSETS}/${user.username}/${user.profileImage.filename}` : null, [user])

    return (
        <Pressable
            {...props}
            key={`avatar-${user._id}-${Date.now()}`}
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

export default SmartAvatar