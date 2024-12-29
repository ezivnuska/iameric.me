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
        getUserByUsername
    } = useUser()
    
    const { setModal } = useModal()
    
    const init = async username => {
        
        setUserLoading(true)
        const user = await loadContact(username)
        setUserLoading(false)

        if (user) updateUser(user)
        else console.log('could not fetch user details')
    }

    const username = useMemo(() => props.route.params?.username, [props.route])
    const profile = useMemo(() => username && findUserByUsername(username), [username])
    const profileImage = useMemo(() => profile?._id && getUserProfileImage(profile._id), [profile])

    useEffect(() => {
        if (username) {
            if (!profile || profile?.username !== props.route.params.username) {
                init(props.route.params.username)
            }
        }
    }, [])

    useEffect(() => {
        if (profile && profile.username !== username) {
            init(username)
        }
    }, [username])

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
                            <View
                                {...props}
                                style={{ flex: 1 }}
                            >

                                <View
                                    key={`contact-${profile.username}-${Date.now()}`}
                                >

                                    <Pressable
                                        onPress={() => setModal('SHOWCASE', {
                                            ...profileImage,
                                            user: { ...profile },
                                        })}
                                        disabled={!profileImage}
                                    >

                                        <ProfileImage
                                            username={profile.username}
                                            image={profileImage}
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