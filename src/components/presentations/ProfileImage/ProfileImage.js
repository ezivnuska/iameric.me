import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { useApp, useUser } from '@context'
import { loadImage } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ProfileImage = ({ user, size = 'auto' }) => {

    const { theme } = useApp()
    const { updateUser } = useUser()
    // const { updateContact } = useContacts()
    
    const [fetching, setFetching] = useState(false)
    const [source, setSource] = useState(null)
    
    // const [currentUser, setCurrentUser] = useState(contact || user)

    useEffect(() => {
        let imageSource = `${IMAGE_PATH}/avatar-default.png`
        if (user?.profileImage) {
            if (typeof user.profileImage === 'string') {
                fetchImage(user.profileImage)
            } else {
                imageSource = `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
                setSource(imageSource)
            }
        } else {
            setSource(imageSource)
        }
    }, [])

    const fetchImage = async id => {
        
        setFetching(true)
        const img = await loadImage(id)
        setFetching(false)

        if (img) {
            // if (contact) {
            //     console.log('updating contact')
            //     updateContact({ _id: contact._id, profileImage: img })
            // } else {
                updateUser({ ...user, profileImage: img })
            // }
            imageSource = `${IMAGE_PATH}/${user?.username}/${img.filename}`
            setSource(imageSource)
        }
    }

    // if (fetching) return <ActivityIndicator size='small' />

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