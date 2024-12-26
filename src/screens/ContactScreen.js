import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { ActivityIndicator, ProfileImage, Screen, TextCopy } from '@components'
import { useModal, useUser } from '@context'

const ContactScreen = props => {

    const {
        userDetailsLoading,
        findUserByUsername,
        fetchUserAndUpdate,
        updateUser,
    } = useUser()
    
    const { setModal } = useModal()

    const [profile, setProfile] = useState(null)
    
    const init = async username => {
        
        let user = findUserByUsername(username)
        
        if (!user) {

            user = await fetchUserAndUpdate(username)
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

    return (
        <Screen
            {...props}
            full={props.route.name === 'Images' && props.route.params?.list}
            secure
        >
            <View style={{ flex: 1 }}>

                {userDetailsLoading
                    ? <ActivityIndicator size='medium' label='Loading User...' />
                    : profile
                        ? (
                            <View
                                {...props}
                                style={{ flex: 1 }}
                            >

                                <View
                                    key={`contact-${profile.username}-${Date.now()}`}
                                >

                                    <Pressable
                                        onPress={() => setModal('SHOWCASE', {
                                            ...profile.profileImage,
                                            user: { ...profile },
                                        })}
                                        disabled={!profile.profileImage}
                                    >

                                        <ProfileImage
                                            user={profile}
                                            size={100}
                                        />

                                    </Pressable>

                                </View>
                        
                            </View>
                        )
                        : <TextCopy>Could not load user details.</TextCopy>
                }

            </View>
            
        </Screen>
    )
}

export default ContactScreen