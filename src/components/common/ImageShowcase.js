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
    const { user, authUser, updateImage, updateUser, setDeletedImage } = useUser()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (typeof data === 'string') {
            findImage(data)
        } else {
            findImage(data._id)
        }

        return () => {
            console.log('ImageShowcase unmounting')
            console.log(' ')
            console.log(' ')
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
        
        console.log('image before avatar change', image)

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

        updateUser({
            ...user,
            profileImage,
        })
        
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
            console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
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

    return (
        <View
            style={{ flex: 1 }}
        >
            {image && (
                <ImageHeader
                    key={`image-showcase-${image._id}-${Date.now()}`}
                    image={image}
                    landscape={landscape}
                    onClose={closeModal}
                />
            )}
            {image && <ImageContainer image={image} />}

            {image && (
                <CaptionContainer
                    image={image}
                    landscape={landscape}
                    onChange={handleCaption}
                    handleAvatar={handleAvatar}
                    deleteImage={handleDelete}
                    loading={loading}
                />
            )}
        </View>
    )
}

const ImageHeader = ({ image, landscape, onClose, ...props }) => {

    const { findUserById } = useUser()
    
    const [owner, setOwner] = useState(null)
    // const owner = useMemo(() => image && findUserById(image.user._id), [image])
    // const profileImage = useMemo(() => owner && owner.profileImage, [owner])
    // useEffect(() => {
    //     console.log('image.user', image.user)
    //     const user = findUserById(image.user._id)
    //     setOwner(user)
    // }, [])

    return image ? (
        <View
            {...props}
            style={{ flexGrow: 0 }}
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
                
                {/* {owner && ( */}
                    <UserAvatar
                        user={image.user}
                        size={landscape ? 30 : 50}
                    />
                {/* )} */}

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
        <View style={{ flexGrow: 1 }}>
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

    const hasAuthorization = useMemo(() => image && (authUser._id === image.user?._id || authUser.role === 'admin'), [image])
    
    const handleCaptionEdit = caption => {
        onChange(caption)
        setEditing(false)
    }

    return (
        <View
            style={{
                flexGrow: 0,
                paddingHorizontal: 10,
                paddingBottom: 15,
                background: 'rgba(0, 0, 0, 0.6)',
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

const CaptionView = ({ image, landscape, onChangeAvatar, setEditing, deleteImage, authorized, loading }) => {

    useEffect(() => {
        console.log('image changed', image)
    }, [image])

    return (
        <View
            style={{
                flex: 1,
                alignContent: 'space-between',
                justifyContent: 'space-between',
                gap: 10,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 10,
                }}
            >
                <ScrollView
                    style={{
                        flex: 1,
                        // flexGrow: 1,//landscape ? 1 : 0,
                        marginTop: 0,
                        // maxWidth: landscape ? 300 : null,
                        maxHeight: 150,//!landscape ? 200 : null,
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 15,
                        // paddingBottom: 20,
                    }}
                >
                    <TextCopy color='#fff'>{image.caption}</TextCopy>
                </ScrollView>

                {authorized && (
                    <View
                        style={{
                            flexGrow: 0,
                            paddingTop: 15,
                        }}
                    >

                        <IconButton
                            name='create-outline'
                            size={24}
                            color='#fff'
                            onPress={() => setEditing(true)}
                            disabled={loading}
                        />

                    </View>
                )}

            </View>

            {authorized && (
                <View
                    style={{
                        flexGrow: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
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
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                    // padding: 8,
                }}
            >
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
                        height: 150,
                        gap: 10,
                        justifyContent: 'space-between',
                        paddingTop: 15,
                        paddingBottom: 10,
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
        </View>
    )
}

export default ImageShowcase