import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ImageList, Screen } from '@components'
import { useApp, useModal, useNotification, useUser } from '@context'
import { loadImages, uploadImage } from '@utils/images'
import { loadContact } from '@utils/contacts'

const ImagesScreen = props => {

    const { landscape } = useApp()
    const { addNotification } = useNotification()
    const { setModal } = useModal()
    const {
        deletedImage,
        imageUpload,
        uploadedImage,
        findUserByUsername,
        removeImage,
        setDeletedImage,
        setImageUpload,
        setUploadedImage,
        setUploading,
    } = useUser()

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [imageIds, setImageIds] = useState(null)

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
        if (profile) {
            initImages(profile._id)
        }
        
    }, [profile])

    const initImages = async userId => {
        setLoading(true)
        
        const loadedImages = await loadImages(userId)
        
        if (loadedImages) {
            setImageIds(loadedImages)
        }

        setLoading(false)
    }

    useEffect(() => {
            
        if (deletedImage) {
            const ids = imageIds.filter(id => id !== deletedImage._id)
            setImageIds(ids)
            removeImage(profile._id, deletedImage._id)
            
            addNotification('Image deleted.')
            setDeletedImage(null)
        }

    }, [deletedImage])

    useEffect(() => {
            
        if (uploadedImage) {

            setImageIds([
                ...imageIds,
                { _id: uploadedImage._id },
            ])
            
            addNotification('Image uploaded.')
        }

    }, [uploadedImage])

    const initUpload = async data => {
        
        const image = await uploadImage({ ...data })
        
        setUploading(null)
        
        if (image) {
            setUploadedImage(image)
        } else {
            console.log('error uploading image')
        }
    }

    useEffect(() => {
        if (imageUpload) {
            initUpload(imageUpload)
            setImageUpload(null)
        }
        
    }, [imageUpload])

    const onRefresh = () => {
        initImages(profile._id)
    }

    useEffect(() => {
        if (profile && props.route.params?.username && profile.username !== props.route.params.username) {
            init(props.route.params.username)
        }
    }, [props.route.params])

    useEffect(() => {
        init(props.route.params.username)
    }, [])

    return (
        <Screen
            secure
            full={landscape || props.route.params?.list}
            {...props}
        >
            {loading
                ? <ActivityIndicator label='Loading images...' color='#fff' />
                : (
                    <View style={{ flex: 1 }}>
                
                        {imageIds && (
                            <ImageList
                                // key={`images-${profile._id}-${Date.now()}`}
                                imageIds={imageIds}
                                user={profile}
                                list={props.route.params?.list || landscape}
                                onPress={image => setModal('SHOWCASE', image)}
                                onRefresh={onRefresh}
                                refreshing={loading}
                            />
                        )}

                    </View>
                )
            }

        </Screen>
    )
}

export default ImagesScreen