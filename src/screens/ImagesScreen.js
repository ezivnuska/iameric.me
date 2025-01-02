import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, UserImages, ImageList, TextCopy, Screen } from '@components'
import { useApp, useModal, useUser } from '@context'

const ImagesScreen = props => {

    const { landscape } = useApp()
    const { setModal } = useModal()
    const {
        fetchUserAndUpdate,
        findUserById,
        findUserByUsername,
        fetchImagesAndUpdate,
        updateUser,
    } = useUser()

    // const profile = useMemo(() => props.route.params?.username && findUserByUsername(props.route.params.username), [props.route.params])
    const [profile, setProfile] = useState(null)
    const user = useMemo(() => profile && findUserByUsername(profile.username), [profile])
    const images = useMemo(() => user?.images, [user])


    useEffect(() => {
        console.log('user', user)
    }, [user])

    const init = async username => {

        let user = findUserByUsername(username)
        
        if (!user) {

            user = await fetchUserAndUpdate(username)
        }
   
        if (user) {

            const fetchedImages = await fetchImagesAndUpdate(user._id)

            if (fetchedImages) {

                user = {
                    ...user,
                    images: fetchedImages,
                }
                
            }
        }

        if (user) setProfile(user)
    }

    useEffect(() => {
        console.log('images', images)
        
    }, [images])

    useEffect(() => {
        console.log('currentUser', currentUser)
        
    }, [currentUser])

    useEffect(() => {
        if (props.route.params?.username) {
            if (!profile || profile?.username !== props.route.params.username) {
                init(props.route.params.username)
            }
        }
        
        return () => setProfile(null)
    }, [])

    useEffect(() => {
        if (profile && profile.username !== props.route.params?.username) {
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

                {!user
                    ? <ActivityIndicator label='Loading User Images...' color='#fff' />
                    : images
                        ? (
                            <UserImages
                                key={`images-${profile._id}-${Date.now()}`}
                                images={images}
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