import React, { useEffect, useState } from 'react'
import { Screen } from './components'
import { ImageList } from '@components'
import { useModal, useNotification, useTheme, useUser } from '@context'
import { loadImages, uploadImage } from '@utils/images'
import { loadContact } from '@utils/contacts'

const ImagesScreen = props => {

    const { landscape, styles } = useTheme()
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
        updateUser,
    } = useUser()

    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState(null)
    const [images, setImages] = useState(null)

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
            updateUser(profile)
            initImages(profile._id)
        }
        
    }, [profile])

    const reset = username => {
        setImages(null)
        setProfile(null)
        init(username)
    }

    const initImages = async userId => {
        setLoading(true)
        
        const loadedImages = await loadImages(userId)
        
        if (loadedImages) {
            setImages(loadedImages)
        }

        setLoading(false)
    }

    useEffect(() => {
            
        if (deletedImage) {
            setImages(images.filter(image => image._id !== deletedImage._id))

            removeImage(profile._id, deletedImage._id)
            
            addNotification('Image deleted.')
            
            setDeletedImage(null)
        }

    }, [deletedImage])

    useEffect(() => {
            
        if (uploadedImage) {

            setImages([
                ...images,
                uploadedImage,
            ])
            
            addNotification('Image uploaded.')

            // setUploadedImage(null)
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
            reset(props.route.params.username)
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
            {/* <View style={[styles.border, { flex: 1 }]}> */}

                {images && (
                    <ImageList
                        // key={`images-${profile._id}-${Date.now()}`}
                        images={images}
                        user={profile}
                        list={props.route.params?.list || landscape}
                        onPress={image => setModal('SHOWCASE', image)}
                        onRefresh={onRefresh}
                        refreshing={loading}
                    />
                )}

            {/* </View> */}

        </Screen>
    )
}

export default ImagesScreen