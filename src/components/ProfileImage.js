import React, { useEffect, useMemo, useState } from 'react'
import {
    Image,
    View,
} from 'react-native'
import { useApp } from '@app'
import ActivityIndicator from './ActivityIndicator'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ProfileImage = ({ user, size = 'auto' }) => {

    const { theme } = useApp()
    
    const [source, setSource] = useState(null)

    const profileImage = useMemo(() => user?.profileImage, [user])

    useEffect(() => {
        
        const imageSource = profileImage
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`
        
        setSource(imageSource)
    }, [profileImage])

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
            {source ? (
                <Image
                    source={source}
                    resizeMode='cover'
                    style={{
                        width: size,
                        height: size,
                    }}
                />
            ) : <ActivityIndicator />}
        </View>
    )
}

export default ProfileImage