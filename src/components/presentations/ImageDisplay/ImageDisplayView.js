import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { AdminButton, Form, IconButton, IconButtonLarge, ImageContained, ProfileImage, TextCopy, Time } from '@components'
import { useApp, useForm, useModal, useUser } from '@context'
import { deleteImage, setAvatar, setCaption } from '@utils/images'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageDisplayView = ({
    disabled,
    image,
    // owner,
    onClose,
    onDelete,
    update,
}) => {

    const { dims, landscape } = useApp()
    
    const {
        clearForm,
        formError,
        formFields,
    } = useForm()

    const { closeModal } = useModal()
    
    const {
        imagesLoading,
        user,
        userLoading,
        findUserById,
        removeImage,
        setImagesLoading,
        setUserLoading,
        updateImage,
        updateUser,
    } = useUser()

    const [editing, setEditing] = useState(false)
    const [overlayVisible, setOverlayVisible] = useState(true)

    const overlayVisibility = useSharedValue(1)

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: overlayVisibility.value,
    }))

    const toggleVisibility = () => {
        if (overlayVisible) {
            overlayVisibility.value = withTiming(0, { duration: 500 }, () => setOverlayVisible(false))
        } else {
            setOverlayVisible(true)
            overlayVisibility.value = withTiming(1, { duration: 500 })
        }
    }
    
    const isOwner = useMemo(() => user._id === image.user?._id, [image])
    const imageSource = useMemo(() => image.user?.username && `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])
    const isProfileImage = useMemo(() => image.user?.profileImage?._id === image._id, [image])
    
    const handleDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setImagesLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setImagesLoading(false)

        if (!deletedImage) console.log('Error deleting image.')
        else {

            removeImage(owner._id, deletedImage._id)

            if (user._id === owner?._id && isProfileImage) {
                
                update({
                    ...user,
                    profileImage: null,
                })
            }

            onClose()
        }
    }

    const handleAvatar = async () => {

        const newAvatarId = user.profileImage?._id !== image._id ? image._id : null

        setUserLoading(true)
        
        const result = await setAvatar(user._id, newAvatarId)
        
        setUserLoading(false)
        
        update({
            ...user,
            profileImage: result,
        })
        
    }
    
    const submitCaptionEdit = async () => {
            
        if (formError) {
            console.log(`Error in form field ${formError.name}: ${formError.message}`)
            return
        }
        
        setUserLoading(true)
        const data = await setCaption(image._id, formFields.caption)
        setUserLoading(false)

        if (data) {
            updateImage({
                ...image,
                caption: data.caption,
            })
            console.log('need to set image caption locally?')
            clearForm()
            setEditing(false)
            return data
        }
        
        console.log('Error saving caption', err)
        return null
    }

    return imageSource ? (
        <View
            style={{
                flex: 1,
                position: 'relative',
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0, right: 0,
                    zIndex: 1,
                    background: '#000',
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ImageContained source={imageSource} />
                </View>
            </View>

            <Pressable
                onPress={toggleVisibility}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0, right: 0,
                    zIndex: 10,
                }}
            />
            
            {overlayVisible && (
                <Animated.View
                    style={[{
                        flex: 1,
                        zIndex: 100,
                    }, overlayStyle]}
                >

                    {/* HEADER CONTAINER */}

                    <View
                        style={{
                            flexGrow: 0,
                            flexDirection: 'row',
                            alignItems: landscape ? 'center' : 'flex-start',
                            paddingLeft: landscape ? 12 : 10,
                            paddingRight: landscape ? 3 : 0,
                            background: 'rgba(0, 0, 0, 0.6)',
                        }}
                    >

                        {/* HEADER CONTENT */}

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: landscape ? 'center' : 'flex-start',
                                flexGrow: 1,
                                gap: 10,
                                paddingVertical: landscape ? 10 : 10,
                            }}
                        >

                            {/* PROFILE IMAGE */}

                            <ProfileImage
                                // image={profileImage}
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

                    <View
                        style={{
                            flex: 1,
                            flexDirection: landscape ? 'row' : 'column',
                            justifyContent: landscape ? 'flex-start' : 'flex-end',
                        }}
                    >
                        <Pressable
                            onPress={toggleVisibility}
                            style={{
                                flexGrow: editing ? 0 : 1,
                                flexShrink: editing ? 1 : 0,
                            }}
                        />
                        
                        <View
                            style={{
                                flexBasis: editing && landscape ? 300 : 'auto',
                                flexGrow: editing && landscape ? 1 : 0,
                                flexShrink: editing && landscape ? 0 : 1,
                            }}
                        >
                            <ScrollView
                                style={{
                                    flexGrow: editing && landscape ? 1 : 0,
                                    marginTop: 0,
                                    maxWidth: landscape && !editing ? 300 : null,
                                    maxHeight: !landscape && !editing ? 200 : null,
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    borderBottomLeftRadius: landscape ? 10 : 0,

                                }}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                }}
                            >
                                <View
                                    style={{
                                        flexGrow: 1,
                                        paddingHorizontal: landscape ? 20 : 10,
                                        paddingBottom: !editing ? 20 : 0,
                                        paddingTop: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        // borderWidth: 1,
                                        // borderColor: 'yellow',
                                        // borderStyle: 'dashed',
                                    }}
                                >

                                    {editing
                                        ? (
                                            <Form
                                                data={image}
                                                fields={[
                                                    {
                                                        name: 'caption',
                                                        placeholder: 'new caption...',
                                                        multiline: true,
                                                    }
                                                ]}
                                                onCancel={() => setEditing(false)}
                                            />
                                        ) : (
                                            <TextCopy color='#fff'>{image.caption}</TextCopy>
                                        )
                                    }
                                </View>

                            </ScrollView>

                            {landscape && (
                                <Pressable
                                    onPress={toggleVisibility}
                                    style={{
                                        flexGrow: editing && landscape ? 0 : 1,
                                    }}
                                />
                            )}
                        </View>
                        

                        {(isOwner || user.role === 'admin') && (
                            <View
                                style={{
                                    flexGrow: 0,
                                    flexDirection: landscape ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    paddingTop: landscape ? 10 : 15,
                                    paddingBottom: landscape ? 20 : 15,
                                    paddingHorizontal: 10,
                                    background: 'rgba(0, 0, 0, 0.6)',
                                }}
                            >
                                {isOwner ? (
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: landscape ? 'column' : 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                    
                                        {!editing ? (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: landscape ? 'column' : 'row',
                                                    alignItems: 'center',
                                                    gap: 20,
                                                }}
                                            >

                                                <View
                                                    style={{
                                                        flexGrow: 1,
                                                        flexDirection: landscape ? 'column' : 'row',
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                        gap: 20,
                                                    }}
                                                >

                                                    <IconButton
                                                        name='create-outline'
                                                        size={24}
                                                        color='#fff'
                                                        onPress={() => setEditing(true)}
                                                        // disabled={imagesLoading}
                                                    />

                                                    <IconButton
                                                        name='happy-sharp'
                                                        size={24}
                                                        color={isProfileImage ? 'tomato' : '#fff'}
                                                        onPress={handleAvatar}
                                                        disabled={imagesLoading}
                                                    />

                                                </View>

                                                <IconButton
                                                    name='trash-outline'
                                                    size={24}
                                                    color='#fff'
                                                    onPress={handleDelete}
                                                    disabled={imagesLoading}
                                                />

                                            </View>
                                        ) : (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: landscape ? 'column' : 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    gap: 20,
                                                }}
                                            >
                                        
                                            {/* <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-evenly',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                }}
                                            > */}

                                                <IconButton
                                                    name='close'
                                                    size={24}
                                                    color='#fff'
                                                    onPress={() => setEditing(false)}
                                                    disabled={userLoading}
                                                />

                                                <IconButton
                                                    name='checkmark-outline'
                                                    size={24}
                                                    color='#0f0'
                                                    onPress={submitCaptionEdit}
                                                    disabled={userLoading}
                                                />

                                            </View>
                                        )}

                                    </View>
                                ) : (
                                    <AdminButton
                                        name='trash-outline'
                                        size={24}
                                        onPress={onDelete}
                                        disabled={disabled}
                                        transparent
                                    />
                                )}

                            </View>
                        )}

                    </View>

                </Animated.View>
            )}
            
        </View>
    ) : (
        <AdminButton
            name='close'
            size={50}
            color='#f00'
            onPress={closeModal}
            // disabled={disabled}
            transparent
        />
    )
}

export default ImageDisplayView