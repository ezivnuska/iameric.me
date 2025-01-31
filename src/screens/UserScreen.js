import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Screen } from './components'
import { UserAvatar } from '@components'
import { useModal, useUser, useTheme } from '@context'
import { loadContact } from '@utils/contacts'
import { create } from '@utils/normalize'

const UserScreen = props => {

    const {
        userLoading,
        findUserByUsername,
        setUserLoading,
    } = useUser()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (props.route.params?.username) {
            initUser(props.route.params.username)
        }
    }, [])

    useEffect(() => {

        // console.log('params', props.route.params)
        
        if (!profile || profile.username !== props.route.params?.username) {
            if (!userLoading) initUser(props.route.params?.username)
        }
    }, [props.route.params])

    const initUser = async username => {

        setUserLoading(true)

        let user = findUserByUsername(username)

        if (!user) {
            user = await loadContact(username)
        }
            
        if (user) {
            setProfile(user)
        }
        
        setUserLoading(false)
    }

    // const loadAvatar = async () => {
    //         console.log('loading avatar')
    
    //         setUserLoading(true)
    
    //         let result = findUserImage(profile._id, profileImage)
    //         console.log('found avatar', result)
    
    //         if (!result) {
    //             result = await loadImage(profileImage)
    //             console.log('loaded avatar', result)
    
    //         }
    
    //         if (result) {
    //             setProfile({
    //                 ...profile,
    //                 profileImage: result,
    //             })
    //         }
    
    //         setUserLoading(false)
    //     }

    return (
        <Screen
            {...props}
            full={props.route.name === 'Images' && props.route.params?.list}
            secure
        >
            {/* <View style={{ flex: 1 }}> */}

            <UserProfile profile={profile} />

            {/* </View> */}
            
        </Screen>
    )
}

const UserProfile = ({ profile }) => {

    // const { theme, toggleTheme } = useTheme()
    const { setModal } = useModal()
    const { user } = useUser()

    const isAuthUser = useMemo(() => profile && user._id === profile._id, [profile])
    
    // useEffect(() => {
    //     console.log('profile', profile)
    // }, [])

    return profile && (
        <View style={{ flex: 1 }}>

            <Pressable
                key={`profile-${profile.username}-${Date.now()}`}
                onPress={() => {
                    // console.log('SHOWCASE', profile)
                    setModal('SHOWCASE', profile.profileImage._id)
                }}
                disabled={!profile.profileImage}
            >
                <UserAvatar user={isAuthUser ? user : profile} size={100} />

            </Pressable>

        </View>
    )
}

export default UserScreen