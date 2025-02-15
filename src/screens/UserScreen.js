import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Screen } from './components'
import { UserAvatar } from '@components'
import { useModal, useUser, useTheme } from '@context'
import { loadContact } from '@utils/contacts'
import { create } from '@utils/normalize'
// import urlMetadata from 'url-metadata'

const UserScreen = props => {
    
    const {
        userLoading,
        findUserByUsername,
        setUserLoading,
    } = useUser()
    const [profile, setProfile] = useState(null)

    // const scrape = async () => {

    //     // try {
    //         const url = 'https://www.npmjs.com/package/url-metadata'
    //         const metadata = await urlMetadata(url, {
    //             requestHeaders: {
    //                 // 'Access-Control-Allow-Origin': 'https://www.npmjs.com',
    //                 'User-Agent': 'url-metadata/3.0 (npm module)',
    //                 // 'From': 'example@example.com'
    //             },
    //             mode: 'no-cors',

    //         })

    //         if (metadata) {

    //             console.log(metadata)
    //         }
    //     //   } catch (err) {
    //     //     console.log(err)
    //     //   }

    // }
    useEffect(() => {
        // scrape()
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
            <View style={{ flex: 1 }}>

                <UserProfile profile={profile} />

            </View>
            
        </Screen>
    )
}

const UserProfile = ({ profile }) => {

    const { theme, toggleTheme } = useTheme()
    const { setModal } = useModal()
    const { authUser } = useUser()

    const isAuthUser = useMemo(() => profile && authUser._id === profile._id, [profile])
    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        // console.log('profile', profile)
        if (profile) {
            setCurrentUser(isAuthUser ? authUser : profile)
        }
    }, [profile])

    useEffect(() => {
        if (isAuthUser) {
            if (authUser.profileImage?._id !== currentUser.profileImage?._id) {
                setCurrentUser(authUser)
            }
        }
    }, [authUser])

    return currentUser && (
        <View style={{ flex: 1, gap: 20 }}>

            <Pressable
                key={`profile-${currentUser.username}-${Date.now()}`}
                onPress={() => {
                    // console.log('SHOWCASE', profile)
                    setModal('SHOWCASE', currentUser.profileImage._id)
                }}
                disabled={!currentUser.profileImage}
            >
                <UserAvatar user={currentUser} size={100} />

            </Pressable>

        </View>
    )
}

export default UserScreen