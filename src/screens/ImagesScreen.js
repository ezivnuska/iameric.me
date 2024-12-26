import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ImageList, TextCopy, Screen } from '@components'
import { useApp, useModal, useUser } from '@context'

const ImagesScreen = props => {

    const { landscape } = useApp()
    const { setModal } = useModal()
    const {
        fetchUserAndUpdate,
        findUserByUsername,
        fetchImagesAndUpdate,
        updateUser,
    } = useUser()

    // const profile = useMemo(() => props.route.params?.username && findUserByUsername(props.route.params.username), [props.route.params])
    const [profile, setProfile] = useState(null)

    const init = async username => {

        let user = findUserByUsername(username)
        
        if (!user) {

            user = await fetchUserAndUpdate(username)
        }
   
        if (user) {

            const images = await fetchImagesAndUpdate(user._id)

            if (images) {

                user = { ...user, images }
                
            }
        }

        if (user) setProfile(user)
    }

    useEffect(() => {
        if (props.route.params?.username) {
            if (!profile || profile?.username !== props.route.params.username) {
                init(props.route.params.username)
            }
        }
    }, [])

    // useEffect(() => {
    //     if (props.route.params?.username) {
    //         if (profile && profile.username !== props.route.params?.username) {
    //             init(props.route.params.username)
    //         }
    //     }
    // }, [props.route.params])

    return (
        <Screen
            secure
            full={props.route.params?.list}
            {...props}
        >
            <View style={{ flex: 1 }}>

                {!profile
                    ? <ActivityIndicator label='Loading User Images...' color='#fff' />
                    : profile.images
                        ? (
                            <ImageList
                                images={profile.images}
                                onPress={(type, data) => setModal(type, data)}
                                list={props.route.params?.list || landscape}
                            />
                        ) : <TextCopy>No images to show.</TextCopy>
                }

            </View>

        </Screen>
    )
}

export default ImagesScreen