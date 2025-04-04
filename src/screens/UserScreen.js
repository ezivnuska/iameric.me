import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Screen } from './components'
import { BondIndicator, Row, SmartAvatar, Stack } from '@components'
import { useModal, useUser } from '@context'
import { loadContact } from '@utils/contacts'
import { Size } from '@utils/stack'

const UserScreen = props => {
    
    const {
        userLoading,
        findUserByUsername,
        setUserLoading,
    } = useUser()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        // console.log('params', props.route.params)
        if (props.route.params?.username) {
            
            if (!profile || profile.username !== props.route.params.username) {
                // console.log('no profile or username changed', profile?.username, props.route.params.username)
                // console.log('userLoading', userLoading)
                if (!userLoading) initUser(props.route.params.username)
            }

        }
        // console.log('params', props.route.params)
        
    }, [props.route.params])

    const initUser = async username => {

        let foundUser = findUserByUsername(username)

        if (!foundUser) {

            setUserLoading(true)
            foundUser = await loadContact(username)
            setUserLoading(false)

        }
            
        if (foundUser) {
            setProfile(foundUser)
        }
        
    }

    return (
        <Screen
            {...props}
            // full={props.route.name === 'Images' && props.route.params?.list}
            secure
        >

            {profile && <UserProfile profile={profile} {...props} />}
            
        </Screen>
    )
}

const UserProfile = ({ profile, ...props }) => {

    const { addModal } = useModal()
    const { user } = useUser()

    return (
        <Stack
            flex={1}
            spacing={Size.S}
        >

            <Row
                spacing={Size.S}
                padding={[Size.None, Size.None, Size.None, Size.M]}
                align='center'
            >
                <View style={{ flex: 1 }}>
                    <Text variant='headlineSmall'>{`${profile?.username || 'User'}`}</Text>
                </View>
                
                <IconButton
                    icon='image-multiple'
                    onPress={() => props.navigation.navigate('Images', {
                        username: props.route.params?.username,
                    })}
                    style={{ margin: 0 }}
                />
                
            </Row>
            
            <Stack
                spacing={Size.S}
                padding={[Size.None, Size.None, Size.None, Size.M]}
            >
                <Pressable
                    key={`profile-${profile.username}-${Date.now()}`}
                    onPress={() => addModal('SHOWCASE', profile.profileImage?._id)}
                    disabled={!profile.profileImage}
                >
                    <SmartAvatar user={profile} size={100} />
                </Pressable>
            
                {(user._id !== profile._id) && <BondIndicator userId={profile._id} />}

            </Stack>

        </Stack>
    )
}

export default UserScreen