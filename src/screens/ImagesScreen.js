import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, UserImages, ImageList, TextCopy, Screen } from '@components'
import { useApp, useModal, useUser } from '@context'

const ImagesScreen = props => {

    const { landscape } = useApp()
    const { setModal } = useModal()
    const {
        user,
        getUserImages,
        fetchUserAndUpdate,
        findUserById,
        findUserByUsername,
        fetchImagesAndUpdate,
        updateUser,
    } = useUser()

    // const profile = useMemo(() => props.route.params?.username && findUserByUsername(props.route.params.username), [props.route.params])
    const [profile, setProfile] = useState(null)
    // const [images, setImages] = useState(null)

    // useEffect(() => {
    //     console.log('images', images)
    // }, [images])

    const getImages = () => {
        const userImages = getUserImages(profile._id)
        return userImages
    }

    // useEffect(() => {
    //     console.log('profile', profile)
    //     // if (profile?.images) setImages(profile.images)
    // }, [profile])

    const init = async username => {

        let user = findUserByUsername(username)
        
        if (!user) user = await fetchUserAndUpdate(username)
   
        if (user) {
            const images = await fetchImagesAndUpdate(user._id)
            if (images) user = { ...user, images }
        }

        if (user) setProfile(user)
    }

    useEffect(() => {
        
        return () => setProfile(null)
    }, [])

    useEffect(() => {
        if (!profile || profile && profile.username !== props.route.params?.username) {
            init(props.route.params.username)
        }
    }, [props.route])

    // const update = () => {
    //     const updatedImages = getUserImages(profile._id)
    //     setImages(updatedImages)
    // }

    return (
        <Screen
            secure
            full={landscape || props.route.params?.list}
            {...props}
        >
            <View style={{ flex: 1 }}>

                {!profile
                    ? <ActivityIndicator label='Loading images...' color='#fff' />
                    : (
                        <UserImages
                            key={`images-${profile._id}-${Date.now()}`}
                            images={getImages()}
                            onPress={(type, data) => setModal(type, data)}
                            list={props.route.params?.list || landscape}
                        />
                    )
                }

            </View>

        </Screen>
    )
}

export default ImagesScreen