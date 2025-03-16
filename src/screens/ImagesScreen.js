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
    const { user, findUserByUsername, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    
    const [images, setImages] = useState(null)

    const init = async username => {
        
        setLoading(true)

        let savedUser = findUserByUsername(username)

        if (!savedUser) {
            savedUser = await loadContact(username)
        }

        setLoading(false)

        if (savedUser) {
            setProfile(savedUser)
        } else {
            console.log('error loading user.')
        }
    }

    useEffect(() => {
        if (profile) {
            if (!profile.images) {
                initImages(profile._id)
            } else {
                setImages(profile.images)
            }
        }
        
    }, [profile])

    useEffect(() => {

        if (images) {

            updateUser({
                _id: profile._id,
                images,
            })
        }

    }, [images])


    const reset = username => {
        init(username)
    }

    const initImages = async userId => {
        setLoading(true)
        
        const loadedImages = await loadImages(userId)
        
        setLoading(false)

        if (loadedImages) {
            setProfile({
                ...profile,
                images: loadedImages,
            })
        }

    }

    const onRefresh = () => {
        initImages(profile._id)
    }

    useEffect(() => {
        if (profile && props.route.params?.username && profile.username !== props.route.params.username) {
            reset(props.route.params.username)
        }
    }, [props.route.params])

    useEffect(() => {
        init(props.route.params.username)
    }, [])

    const isCurrentUser = useMemo(() => props.route.params?.username === user?.username, [props.route])

    const toggleViewMode = () => navigation.navigate('Images', {
        username: props.route.params?.username,
        list: !props.route.params?.list,
    })

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
                                setImages([...images, item])
                            }}
                            onUploaded={item => {
                                setImages([...images, item])
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
                    list={props.route.params?.list || landscape}
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