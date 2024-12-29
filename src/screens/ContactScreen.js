import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, ProfileImage, Screen, TextCopy } from '@components'
import { useModal, useUser } from '@context'
import { loadContact } from '@utils/contacts'

const ContactScreen = props => {

    const {
        userLoading,
        findUserByUsername,
        updateUser,
        getUserProfileImage,
        setUserLoading,
        getUserByUsername,
    } = useUser()
    
    const { setModal } = useModal()

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (props.route.params?.username) {
            init(props.route.params.username)
        }
        return () => setProfile(null)
    }, [])

    useEffect(() => {
        if (profile?.username !== props.route.params?.username) {
            init(props.route.params?.username)
        }
    }, [props.route])
    
    const init = async username => {
        
        setUserLoading(true)

        let user = findUserByUsername(username)
        
        if (!user) {

            user = await loadContact(username)
            
        }
        
        if (user) {
            setProfile(user)
            updateUser(user)
        }

        setUserLoading(false)
    }

    return (
        <Screen
            {...props}
            full={props.route.name === 'Images' && props.route.params?.list}
            secure
        >
            <View style={{ flex: 1 }}>

                {userLoading
                    ? <ActivityIndicator size='medium' label='Loading User...' />
                    : profile
                        ? (
                            <Pressable
                                key={`contact-${profile.username}-${Date.now()}`}
                                onPress={() => setModal('SHOWCASE', {
                                    image: profile.profileImage,
                                    owner: profile,
                                })}
                                disabled={!profile.profileImage}
                            >

                                {/* {profile.profileImage && ( */}
                                    <ProfileImage
                                        user={profile}
                                        // image={profileImage}
                                        size={100}
                                    />
                                {/* )} */}

                            </Pressable>
                        )
                        : <TextCopy>Could not load user details.</TextCopy>
                }

            </View>
            
        </Screen>
    )
}

export default ContactScreen