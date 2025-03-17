import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Screen } from './components'
import { AddImageButton, ImageList } from '@components'
import { useModal, useNotification, useTheme, useUser } from '@context'
import { loadImages } from '@utils/images'
import { loadContact } from '@utils/contacts'

const ImagesScreen = props => {

    const { landscape } = useTheme()
    const { addModal } = useModal()
    const { user, getUser, getUserImages, findUserByUsername, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    
    // const [images, setImages] = useState(null)
    const owner = useMemo(() => profile && getUser(profile._id), [profile])
    const images = useMemo(() => owner && getUserImages(owner._id), [owner])

    const [viewMode, setViewMode] = useState('grid')

    const init = async username => {

        let savedUser = findUserByUsername(username)

        if (!savedUser) {
            console.log('user not saved; loading user...')
        
            setLoading(true)

            savedUser = await loadContact(username)

            setLoading(false)
        }
        
        if (savedUser) {
            console.log('loaded user', savedUser)
            if (!savedUser.images) {
                initImages(savedUser._id)
            }
            setProfile(savedUser)
            // updateUser(savedUser)
        } else {
            console.log('error loading user.')
        }
    }

    useEffect(() => {
        if (profile) {
            updateUser(profile)
            // if (!profile.images) {
            //     initImages(profile._id)
            // }
            // else {
            //     setImages(profile.images)
            // }
        }
        
    }, [profile])

    // useEffect(() => {
    //     console.log('images', images)
    //     if (images) {

    //         updateUser({
    //             profile,
    //             images,
    //         })
    //     }

    // }, [images])
    useEffect(() => {
        console.log('owner', owner)

    }, [owner])


    const reset = username => {
        init(username)
    }

    const initImages = async userId => {
        setLoading(true)
        
        const loadedImages = await loadImages(userId)
        
        setLoading(false)
        console.log('loaded images', loadedImages)
        if (loadedImages) {
            setProfile({
                ...profile,
                images: loadedImages,
            })
            // updateUser({
            //     ...profile,
            //     images: loadedImages,
            // })
        }

    }

    const onRefresh = () => {
        initImages(profile._id)
    }

    useEffect(() => {
        if (profile && props.route.params?.username && profile.username !== props.route.params.username) {
            console.log('resetting')
            reset(props.route.params.username)
        }

        // setViewMode(props.route.params.list ? 'list' : 'grid')

    }, [props.route.params])

    useEffect(() => {
        init(props.route.params.username)
    }, [])

    const isCurrentUser = useMemo(() => props.route.params?.username === user?.username, [props.route])

    const toggleViewMode = () => {
        setViewMode(viewMode === 'list' ? 'grid' : 'list')
        // navigation.navigate('Images', {
        //     username: props.route.params?.username,
        //     list: !props.route.params?.list,
        // })
    }

    return (
        <Screen
            secure
            full={landscape || props.route.params?.list}
            {...props}
        >
            {/* <View style={[styles.border, { flex: 1 }]}> */}
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
                    {isCurrentUser && (
                        <AddImageButton
                            onSelection={item => {
                                setProfile({
                                    ...profile,
                                    images: [...profile.images, item]
                                })
                            }}
                            onUploaded={item => {
                                setProfile({
                                    ...profile,
                                    images: [...profile.images, item]
                                })
                            }}
                        />
                    )}
                    {/* {isCurrentUser && ( */}
                        <IconButton
                            icon='grid'
                            onPress={toggleViewMode}
                        />
                    {/* )}
                    {isCurrentUser && ( */}
                        <IconButton
                            icon='table-column'
                            onPress={toggleViewMode}
                        />
                    {/* )} */}
                </View>
            </View>

            {profile?.images && (
                <ImageList
                    // key={`images-${profile._id}-${Date.now()}`}
                    images={profile.images}
                    user={profile}
                    list={viewMode === 'list' || landscape}
                    onPress={image => addModal('SHOWCASE', image)}
                    onRefresh={onRefresh}
                    refreshing={loading}
                />
            )}

            {/* </View> */}

        </Screen>
    )
}

export default ImagesScreen