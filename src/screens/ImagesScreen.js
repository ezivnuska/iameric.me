import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, UserImages, Screen } from '@components'
import { useApp, useModal, useUser } from '@context'

const ImagesScreen = props => {

    const { landscape } = useApp()
    const { setModal } = useModal()
    const {
        user,
        getUserImages,
        fetchUserAndUpdate,
        findUserByUsername,
        fetchImagesAndUpdate,
    } = useUser()

    const [profile, setProfile] = useState(null)

    const getImages = () => {
        const userImages = getUserImages(profile._id)
        return userImages
    }

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