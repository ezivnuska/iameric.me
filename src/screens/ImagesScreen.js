import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { Screen } from './components'
import { AddImageButton, ImageList } from '@components'
import { useModal, useNotification, useTheme, useUser } from '@context'
import { loadImages, uploadImage } from '@utils/images'
import { loadContact } from '@utils/contacts'

const ImagesScreen = props => {

    const { landscape, styles } = useTheme()
    const { addNotification } = useNotification()
    const { addModal } = useModal()
    const {
        user,
        users,
        deletedImage,
        imageUpload,
        uploadedImage,
        findUserByUsername,
        removeImage,
        setDeletedImage,
        setImages,
        setUploadedImage,
        setUploading,
        updateUser,
    } = useUser()

    const [loading, setLoading] = useState(false)
    // const [stale, setStale] = useState(false)
    const [profile, setProfile] = useState(null)
    // const stale = useMemo(() => profile.images, [profile])
    const [items, setItems] = useState(null)

    const init = async username => {
        
        setLoading(true)

        let savedUser = findUserByUsername(username)

        if (!savedUser) {
            savedUser = await loadContact(username)
        }

        if (savedUser) {
            setProfile(savedUser)
        } else {
            console.log('could not load user')
        }

        setLoading(false)
    }

    useEffect(() => {
        console.log('profile', profile)
        if (profile) {
            if (!profile.images) {
                initImages(profile._id)
            } else {
                setItems(profile.images)
            }
            updateUser(profile)
        }
        
    }, [profile])

    // useEffect(() => {
    //     console.log('hello', profile)
    //     if (stale) {
    //         initImages(profile._id)
    //     }
    // }, [stale])

    const reset = username => {
        // setItems(null)
        // setProfile(null)
        init(username)
    }

    const initImages = async userId => {
        setLoading(true)
        
        const loadedImages = await loadImages(userId)
        
        if (loadedImages) {
            console.log('loadedImages', loadedImages)
            setItems(loadedImages)
            setProfile({
                ...profile,
                images: loadedImages,
            })
        }

        setLoading(false)
    }

    useEffect(() => {
            
        if (deletedImage) {
            // setItems(items.filter(image => image._id !== deletedImage._id))

            removeImage(profile._id, deletedImage._id)
            
            addNotification('Image deleted.')
            
            setDeletedImage(null)
        }

    }, [deletedImage])

    // useEffect(() => {
            
    //     if (uploadedImage) {

    //         setImages([
    //             ...images,
    //             uploadedImage,
    //         ])
            
    //         addNotification('Image uploaded.')

    //         // setUploadedImage(null)
    //     }

    // }, [uploadedImage])

    // const initUpload = async data => {
        
    //     const image = await uploadImage(data)
        
    //     setUploading(null)
        
    //     if (image) {
    //         setUploadedImage(image)
    //     } else {
    //         console.log('error uploading image')
    //     }
    // }

    // useEffect(() => {
    //     if (imageUpload) {
    //         initUpload(imageUpload)
    //         setImageUpload(null)
    //     }
        
    // }, [imageUpload])

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

    // const viewMode = useMemo(() => route.params?.list ? 'list' : 'grid', [route.params])

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
                        <AddImageButton onComplete={item => setItems([...items, item])} />
                        // <Appbar.Action
                        //     icon="file-image-plus"
                        //     onPress={() => addModal('IMAGE_UPLOAD')}
                        //     disabled={uploading}
                        // />
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

            {items && (
                <ImageList
                    // key={`images-${profile._id}-${Date.now()}`}
                    images={items}
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