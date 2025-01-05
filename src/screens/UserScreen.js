import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, ProfileImage, Screen, TextCopy } from '@components'
import { useModal, useUser } from '@context'
import { loadContact } from '@utils/contacts'

const UserScreen = props => {

    const {
        userLoading,
        findUserByUsername,
        updateUser,
        // setUserLoading,
        getUserByUsername,
    } = useUser()
    
    const { setModal } = useModal()

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)

    // useEffect(() => {
    //     if (props.route.params?.username) {
    //         init(props.route.params.username)
    //     }
    //     return () => setProfile(null)
    // }, [])

    useEffect(() => {
        if (profile?.username !== props.route.params?.username) {
            init(props.route.params?.username)
        }
    }, [props.route.params])

    useEffect(() => {
        // if (profile) {
        //     updateUser(profile)
        // }
    }, [profile])
    
    const init = async username => {
        
        setLoading(true)

        let user = findUserByUsername(username)

        if (!user) {

            user = await loadContact(username)
            
            // if (user) {
            //     updateUser(user)
            // }
        }

        if (user) {
            setProfile(user)
        } else {
            console.log('could not load user.')
        }
        
        setLoading(false)
    }

    return (
        <Screen
            {...props}
            full={props.route.name === 'Images' && props.route.params?.list}
            secure
        >
            <View style={{ flex: 1 }}>

                {loading
                    ? <ActivityIndicator size='medium' label='Loading User...' />
                    : profile
                        ? (
                            <Pressable
                                key={`contact-${profile.username}-${Date.now()}`}
                                onPress={() => setModal('SHOWCASE', profile.profileImage)}
                                disabled={!profile.profileImage}
                            >

                                <ProfileImage
                                    user={profile}
                                    size={100}
                                />

                            </Pressable>
                        )
                        : <TextCopy>Could not load user details.</TextCopy>
                }

            </View>
            
        </Screen>
    )
}

export default UserScreen