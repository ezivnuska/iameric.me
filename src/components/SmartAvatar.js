import React, { useEffect, useMemo, useState } from 'react'
import { Pressable } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useUser } from '@context'
import { Paths } from '@constants'

const SmartAvatar = ({ user, size = 50, onPress = null, ...props }) => {
    
    const { iam, getUser, getProfileImage } = useUser()

    // const [profileImage, setProfileImage] = useState(null)
    // const [userId, setUserId] = useState(user._id) 
    const currentUser = useMemo(() => getUser(user._id), [user])
    const isMe = user._id === iam._id
    // {
    //     if (user._id !== iam._id) {
    //         return 
    //     } else {
    //         return iam
    //     }
    // }, [userId])
    
    const getSource = (profileImage = null) => {
        return profileImage ? `${Paths.ASSETS}/${currentUser.username}/${currentUser.profileImage.filename}` : null
    }

    const source = useMemo(() => {
        let profileImage = isMe ? iam.profileImage : currentUser?.profileImage
        return getSource(profileImage)
    }, [iam, currentUser])
    // const [currentUser, setCurrentUser] = useState(null)
    // const profileImage = useMemo(() => currentUser && getProfileImage(currentUser._id), [currentUser])
    // const [source, setSource] = useState(null)
    
    // useEffect(() => {
    //     if (user._id !== iam._id) {
    //         console.log('user is not')
    //         setCurrentUser(user)
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log('profile image', profileImage)
    //     let newSource = profileImage ? `${Paths.ASSETS}/${user.username}/${profileImage.filename}` : null
    //     console.log('source', source)
    //     console.log('newSource', newSource)
    //     if (source !== newSource) setSource(newSource)
    // }, [profileImage])

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