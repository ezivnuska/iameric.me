import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Screen } from './components'
import { BondIndicator, SmartAvatar } from '@components'
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

        let foundUser = findUserByUsername(username)

        if (!foundUser) {
            foundUser = await loadContact(username)
        }
            
        if (foundUser) {
            setProfile(foundUser)
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
    // const isCurrentUser = useMemo(() => props.route.params?.username === user?.username, [props.route])

    // const viewMode = useMemo(() => route.params?.list ? 'list' : 'grid', [route.params])

    return (
        <Screen
            {...props}
            full={props.route.name === 'Images' && props.route.params?.list}
            secure
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: 15,
                    paddingRight: 5,
                }}
            >
                <Text variant='headlineSmall'>{`${profile?.username || 'User'} : Images`}</Text>
                
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <IconButton
                        icon='image-multiple'
                        onPress={() => props.navigation.navigate('Images', {
                            username: props.route.params?.username,
                            // list: false,
                        })}
                    />
                </View>
            </View>
            
            <View style={{ flex: 1 }}>

                <UserProfile profile={profile} />

            </View>
            
        </Screen>
    )
}

const UserProfile = ({ profile }) => {

    const { theme, toggleTheme } = useTheme()
    const { addModal } = useModal()
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
            if (authUser.profileImage?._id !== profile.profileImage?._id) {
                setCurrentUser(authUser)
            }
        }
    }, [authUser])

    return profile && (
        <View style={{ flex: 1, gap: 20 }}>

            <Pressable
                key={`profile-${profile.username}-${Date.now()}`}
                onPress={() => {
                    // console.log('SHOWCASE', profile)
                    addModal('SHOWCASE', profile.profileImage._id)
                }}
                disabled={!profile.profileImage}
            >
                <SmartAvatar user={profile} size={100} />

            </Pressable>
                
            <BondIndicator userId={profile._id} />

        </View>
    )
}

export default UserScreen