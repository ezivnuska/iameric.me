import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ImageList, Screen } from '@components'
import { useApp, useModal, useUser } from '@context'
import { loadImages } from '@utils/images'
import { loadContact } from '@utils/contacts'

const ImagesScreen = props => {

    const { landscape } = useApp()
    const { setModal } = useModal()
    const { findUserByUsername, updateImage, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [imageIds, setImageIds] = useState(null)

    const init = async username => {
        
        setLoading(true)

        let savedUser = findUserByUsername(props.route.params.username)
        
        if (!savedUser) {
            savedUser = await loadContact(username)
        }

        if (savedUser) {
            setProfile(savedUser)
        } else {
            console.log('could not load user')
        }

        setLoading(false)
    }

    const initImages = async userId => {
        
        setLoading(true)
        
        const loadedImages = await loadImages(userId)
        
        if (loadedImages) {
            setImageIds(loadedImages.map(({ _id }) => _id))
        }

        setLoading(false)
    }

    useEffect(() => {
        if (profile && !profile.images) {
            initImages(profile._id)
        }
        
    }, [profile])

    const onRefresh = () => {
        initImages(profile._id)
    }

    useEffect(() => {
        if (profile?.username !== props.route.params?.username) {
            init(props.route.params.username)
        }
    }, [props.route.params])

    return (
        <Screen
            secure
            full={landscape || props.route.params?.list}
            {...props}
        >
            <View style={{ flex: 1 }}>

                {loading
                    ? <ActivityIndicator label='Loading images...' color='#fff' />
                    : imageIds
                        ? (
                            <ImageList
                                // key={`images-${profile._id}-${Date.now()}`}
                                imageIds={imageIds}
                                user={profile}
                                list={props.route.params?.list || landscape}
                                onPress={(type, data) => setModal(type, data)}
                                onRefresh={onRefresh}
                                refreshing={loading}
                            />
                        )
                        : null
                }

            </View>

        </Screen>
    )
}

export default ImagesScreen