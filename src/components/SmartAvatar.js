import React, { useEffect, useMemo, useState } from 'react'
import { Pressable } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useUser } from '@context'
import { Paths } from '@constants'

const SmartAvatar = ({ user, size = 50, onPress = null, ...props }) => {
    
    const { findUserById, getUserProfileImage } = useUser()

    const currentUser = useMemo(() => user && findUserById(user._id), [user])
    const image = useMemo(() => currentUser && getUserProfileImage(currentUser._id), [currentUser])
    const source = useMemo(() => image ? `${Paths.ASSETS}/${currentUser.username}/${image.filename}` : null, [image])

    return (
        <Pressable
            key={`avatar-${user._id}-${Date.now()}`}
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

export default SmartAvatar