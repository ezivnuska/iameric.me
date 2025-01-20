import React, { useEffect, useMemo, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { ActivityIndicator, Form, IconButton, IconButtonLarge, TextCopy, Time, UserAvatar } from '@components'
import { useApp, useForm, useModal, useUser } from '@context'
import { deleteImage, loadImage, setAvatar, setCaption } from '@utils/images'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageShowcase = ({ data }) => {

    const { landscape } = useApp()
    const { clearForm, formError, formFields } = useForm()
    const { closeModal } = useModal()
    const { user, authUser, setDeletedImage, updateImage, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (typeof data === 'string') {
            console.log('ImageShowcase received _id string')
            findImage(data)
        } else {
            findImage(data._id)
        }
    }, [])

    const findImage = async imageId => {
        
        setLoading(true)

        let loadedImage = await loadImage(imageId)

        if (loadedImage) {
            setImage(loadedImage)
        } else {
            console.log('COULD NOT LOAD IMAGE')
        }

        setLoading(false)
    }
    
    const handleAvatar = async () => {

        const isProfileImage = image.user.profileImage && image._id === image.user.profileImage._id
        
        setLoading(true)
        
        const profileImage = await setAvatar(authUser._id, isProfileImage ? null : image._id)
        
        const updatedImage = {
            ...image,
            user: {
                ...image.user,
                profileImage,
            },
        }
        
        setImage(updatedImage)

        updateUser({ ...user, profileImage })
        
        setLoading(false)
    }
    
    const handleDelete = async () => {
    
        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setLoading(true)

        const response = await deleteImage(image, authUser.profileImage?._id === image._id)
        
        setLoading(false)

        if (response.deletedImage) {
            
            setDeletedImage(response.deletedImage)
            
            closeModal()

        } else {

            console.log('Error deleting image.')
        }

    }
        
    const handleCaption = async () => {
            
        if (formError) {
            return console.log(`Error in form field ${formError.name}: ${formError.message}`)
        }
        
        setLoading(true)

        const { caption } = await setCaption(image._id, formFields.caption)

        if (caption) {

            clearForm()

            updateImage({
                ...image,
                caption,
            })
        
            setImage({
                ...image,
                caption,
            })

        } else {
            console.log('Error saving caption')
        }
        
        setLoading(false)
        
    }

    return image ? (
        <View
            style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 1.0)',
            }}
        >
            <ImageHeader
                key={`image-showcase-${image._id}-${Date.now()}`}
                image={image}
                landscape={landscape}
                onClose={closeModal}
            />

            <View
                style={{
                    flex: 1,
                    flexDirection: landscape ? 'row' : 'column',
                    gap: 20,
                }}
            >
                
                <ImageContainer image={image} />

                <CaptionContainer
                    image={image}
                    landscape={landscape}
                    onChange={handleCaption}
                    handleAvatar={handleAvatar}
                    deleteImage={handleDelete}
                    loading={loading}
                />

            </View>

        </View>
    ) : <ActivityIndicator />
}

const ImageHeader = ({ image, landscape, onClose, ...props }) => {

    return image ? (
        <View
            {...props}
            style={{
                flexGrow: 0,
                // background: 'rgba(255, 255, 255, 0.25)',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: landscape ? 'center' : 'flex-start',
                    flexGrow: 1,
                    gap: 10,
                    paddingVertical: 5,
                    paddingLeft: 10,
                }}
            >

                {/* PROFILE IMAGE */}
                
                <UserAvatar
                    user={image.user}
                    size={landscape ? 30 : 50}
                />

                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        flexDirection: landscape ? 'row' : 'column',
                        alignItems: landscape ? 'center' : 'flex-start',
                        justifyContent: landscape ? 'space-between' : 'flex-start',
                    }}
                >
                        
                    {image.user && (
                        <TextCopy
                            size={landscape ? 16 : 20}
                            color='#fff'
                            bold
                            style={{ lineHeight: 25 }}
                        >
                            {image.user.username}
                        </TextCopy>
                    )}

                    <Time
                        time={image.createdAt}
                        color='#ddd'
                        prefix='Uploaded '
                        style={{ lineHeight: 25 }}
                        size={14}
                    />

                </View>
                
                {/* CLOSE BUTTON */}
    
                <IconButtonLarge
                    name='close'
                    onPress={onClose}
                    size={landscape ? 28 : 32}
                    color='#fff'
                    transparent
                />

            </View>

        </View>
    ) : null
}

const ImageContainer = ({ image }) => {

    const source = useMemo(() => image && image.user && `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

    return (
        <View
            style={{
                // flex: 1,
                flexGrow: 1,
                // flexShrink: 1,
                flexBasis: 'auto',
            }}
        >
            <Image
                source={source}
                resizeMode='contain'
                style={{ flexGrow: 1, alignSelf: 'stretch' }}
            />
        </View>
    )
}

const CaptionContainer = ({
    image,
    landscape,
    deleteImage,
    handleAvatar,
    onChange,
    loading,
}) => {

    const { authUser } = useUser()
    
    const [editing, setEditing] = useState(false)

    const hasAuthorization = useMemo(() => image && (authUser._id === image.user?._id), [image])
    // const isAdmin = useMemo(() => authUser && authUser.role === 'admin', [authUser])
    
    const handleCaptionEdit = caption => {
        onChange(caption)
        setEditing(false)
    }

    return hasAuthorization && (
        <View
            style={{
                // flex: 1,
                flexBasis: 'auto',
                flexShrink: 1,
                maxHeight: landscape ? null : '50%',
                maxWidth: landscape ? '40%' : null,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
            }}
        >
            {
                !editing
                    ? (
                        <CaptionView
                            image={image}
                            landscape={landscape}
                            setEditing={() => setEditing(true)}
                            onChangeAvatar={handleAvatar}
                            deleteImage={deleteImage}
                            authorized={hasAuthorization}
                            loading={loading}
                        />
                    )
                    : (
                        <CaptionForm
                            image={image}
                            landscape={landscape}
                            onCancel={() => setEditing(false)}
                            onChange={handleCaptionEdit}
                            loading={loading}
                        />
                    )
            }
        </View>
    )
}

const CaptionView = ({ image, onChangeAvatar, setEditing, deleteImage, authorized, loading }) => {

    return (
        <View
            style={{ flex: 1 }}
        >

            <ScrollView
                style={{
                    flex: 1,
                    marginTop: 0,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: 10,
                }}
            >
                <TextCopy color='#fff'>{image.caption}</TextCopy>
            </ScrollView>

            {authorized && (
                <View
                    style={{
                        flexGrow: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingVertical: 15,
                        gap: 20,
                    }}
                >

                    <IconButton
                        name='create-outline'
                        size={24}
                        color='#fff'
                        onPress={() => setEditing(true)}
                        disabled={loading}
                    />
                    
                    <IconButton
                        name='happy-sharp'
                        size={24}
                        color={image && image.user?.profileImage && image._id === image.user.profileImage._id ? 'tomato' : '#fff'}
                        onPress={onChangeAvatar}
                        disabled={loading}
                    />
                    
                    <IconButton
                        name='trash-outline'
                        size={24}
                        color='#fff'
                        onPress={deleteImage}
                        disabled={loading}
                    />
                </View>
            )}
            
        </View>
    )
}

const CaptionForm = ({ image, onChange, onCancel, loading }) => {

    const {
        formLoading,
        getDirty,
    } = useForm()

    return (
        <View style={{ flex: 1, flexShrink: 1 }}>
            <View
                style={{
                    flexGrow: 1,
                }}
            >
                <Form
                    data={image}
                    fields={[
                        {
                            name: 'caption',
                            placeholder: 'new caption...',
                            multiline: true,
                        }
                    ]}
                    onCancel={onCancel}
                />

            </View>

            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    paddingVertical: 10,
                    gap: 20,
                }}
            >
        
                <IconButton
                    name='close'
                    size={24}
                    color='#fff'
                    onPress={onCancel}
                    disabled={loading}
                />

                <IconButton
                    name='checkmark-outline'
                    size={24}
                    color='#0f0'
                    onPress={onChange}
                    disabled={loading || formLoading || !getDirty('caption')}
                />

            </View>

        </View>
    )
}

export default ImageShowcase