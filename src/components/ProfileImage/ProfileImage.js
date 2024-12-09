import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { useApp, useContacts, useUser } from '@context'
import { loadImage } from '@utils/images'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ProfileImage = ({ contact = null, size = 'auto' }) => {

    const { theme } = useApp()
    const { updateUser, user } = useUser()
    const { updateContact } = useContacts()
    
    const [fetching, setFetching] = useState(false)
    const [source, setSource] = useState(null)
    
    const [currentUser, setCurrentUser] = useState(contact || user)

    useEffect(() => {
        let imageSource = `${IMAGE_PATH}/avatar-default.png`
        if (currentUser?.profileImage) {
            if (typeof currentUser.profileImage === 'string') {
                fetchImage(currentUser.profileImage)
            } else {
                imageSource = `${IMAGE_PATH}/${currentUser.username}/${currentUser.profileImage.filename}`
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
            //     updateUser({ profileImage: img })
            // }
            imageSource = `${IMAGE_PATH}/${currentUser?.username}/${img.filename}`
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