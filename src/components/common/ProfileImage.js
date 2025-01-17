import React, { useEffect, useMemo, useState } from 'react'
import { Image, View } from 'react-native'
import { ActivityIndicator } from '@components'
import { useApp, useUser } from '@context'
import { loadImage } from '@utils/images'
import { loadContactById } from '@utils/contacts'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ProfileImage = ({ user, size = 'auto' }) => {

    const { theme } = useApp()
    const { findUserById, findUserImage } = useUser()

    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)


    const source = useMemo(() => image
        ? `${IMAGE_PATH}/${image.user.username}/${image.filename}`
        : `${IMAGE_PATH}/avatar-default.png`, [image])

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (image && user.profileImage !== image._id) {
            init()
        }
    }, [user])

    const init = async () => {

        if (!loading) setLoading(true)

        let result = null

        const imageId = typeof user.profileImage === 'string'
            ? user.profileImage
            : user.profileImage?._id
        
        if (imageId) {
            result = findUserImage(user._id, imageId)

            if (!result) {
                result = await loadImage(imageId)
            }
        }
        
        setImage(result)

        setLoading(false)
    }

    return !loading && source ? (
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
    : <ActivityIndicator size='small' />
}

export default ProfileImage