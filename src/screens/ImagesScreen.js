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
    const { user, addImage, completeUpload, getUser, getUserImages, findUserByUsername, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    
    const owner = useMemo(() => profile && getUser(profile._id), [profile, user])
    const images = useMemo(() => owner && getUserImages(owner._id), [owner])

    // useEffect(() => {
    //     if (images) {
    //         console.log('owner images', images)
    //     }
    // }, [images])

    // useEffect(() => {
    //     if (owner) {
    //         console.log('owner', owner)
    //     }
    // }, [owner])

    const [viewMode, setViewMode] = useState('grid')

    const initUser = async username => {
        
        setLoading(true)

        let savedUser = await loadContact(username)

        setLoading(false)
        
        if (savedUser) {
            
            if (!savedUser.images) {
                initImages(savedUser._id)
            } else {
                setProfile(savedUser)
            }

        } else {
            console.log('error loading user.')
        }
    }

    useEffect(() => {
        if (profile) {
            // console.log('profile', profile)
            if (!profile.images) {
                // updateUser(profile)
                initImages(profile._id)
            }
        }
        
    }, [profile])

    useEffect(() => {
        if (profile && props.route.params?.username && profile.username !== props.route.params.username) {
            
            reset(props.route.params.username)
        }

        // setViewMode(props.route.params.list ? 'list' : 'grid')

    }, [props.route.params])

    useEffect(() => {
        const { username } = props.route.params
        let savedUser = findUserByUsername(username)

        if (savedUser) {
            setProfile(savedUser)
        } else {
            initUser(props.route.params.username)
        }
    }, [])

    // useEffect(() => {
    //     console.log('owner', owner)

    // }, [owner])


    const reset = username => {
        initUser(username)
    }

    const initImages = async userId => {
        setLoading(true)
        
        const loadedImages = await loadImages(userId)
        
        setLoading(false)
        // console.log('loaded images', loadedImages)
        if (loadedImages) {
            setProfile({
                ...profile,
                images: loadedImages,
            })
            updateUser({
                ...profile,
                images: loadedImages,
            })
        }

    }

    const onRefresh = () => {
        initImages(profile._id)
    }

    const isCurrentUser = useMemo(() => props.route.params?.username === user?.username, [props.route])

    const toggleViewMode = () => {
        setViewMode(viewMode === 'list' ? 'grid' : 'list')
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
                                addImage(profile._id, item)
                                setProfile({
                                    ...profile,
                                    images: [...profile.images, item]
                                })
                            }}
                            onUploaded={item => {
                                completeUpload(profile._id, item)
                                setProfile({
                                    ...profile,
                                    images: profile.images.map(image => image.uri ? item : image),
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

            {images && (
                <ImageList
                    // key={`images-${profile._id}-${Date.now()}`}
                    images={images}
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