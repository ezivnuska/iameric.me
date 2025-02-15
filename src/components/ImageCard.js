import React, { useEffect, useMemo, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Avatar, Button, Card, Icon, IconButton, MD3Colors, Text } from 'react-native-paper'
import { useForm, useModal, useTheme, useUser } from '@context'
import { deleteImage, loadImage, setAvatar, setCaption } from '@utils/images'
import { Time, UserAvatar } from '@components'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const CardHeader = ({ user, close, time = null }) => {
    return (
        <View
            style={{
                flexGrow: 0,
                flexShrink: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                paddingLeft: 15,
                paddingRight: 5,
                paddingVertical: 5,
            }}
        >
            <UserAvatar user={user} size={time ? 40 : 30} />

            <View style={{ flexGrow: 1 }}>
                
                <Text variant='titleMedium' style={{ flex: 1 }}>
                    {user.username}
                </Text>

                {time && <Time time={time} />}

            </View>

            <IconButton
                icon='close-thick'
                size={20}
                onPress={close}
                style={{
                    padding: 0,
                    margin: 0,
                }}
            />

        </View>
    )
}

const ImageCard = ({ data }) => {

    const { clearForm, formError, formFields } = useForm()
    const { closeModal, setModal } = useModal()
    const { landscape } = useTheme()
    const { user, setDeletedImage, updateImage, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    
    const isProfileImage = useMemo(() => image && user.profileImage?._id === image._id, [user])
    const isOwner = useMemo(() => user && image && user._id === image.user._id, [image])
    const hasAuthorization = useMemo(() => user && user.role === 'admin', [user])
    const source = useMemo(() => image && image.user && `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

    const init = () => {
        if (typeof data === 'string') {
            findImage(data)
        } else {
            findImage(data._id)
        }
    }

    // useEffect(() => {
    //     return () => setImage(null)
    // }, [])

    useEffect(() => {
        init()
    }, [user, data])

    // useEffect(() => {
    //     if (image.user._id === user._id)
    // }, [image])

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

        const imageIsAvatar = image.user.profileImage && image._id === image.user.profileImage._id
        
        setLoading(true)
        
        const profileImage = await setAvatar(user._id, imageIsAvatar ? null : image._id)
        
        const updatedImage = {
            ...image,
            user: {
                ...image.user,
                profileImage,
            },
        }
        
        // setImage(updatedImage)

        updateUser({ ...user, profileImage })
        
        setLoading(false)
    }
    
    const handleDelete = async () => {
    
        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setLoading(true)

        const response = await deleteImage(image, user.profileImage?._id === image._id)
        
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

    const renderHeader = () => (
        <View
        // style={{ flex: 1 }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                }}
            >
                <UserAvatar user={image.user} size={25} />
                <Text variant='titleLarge' style={{ flexGrow: 1 }}>
                    {image.user.username}
                </Text>
                <IconButton 
                    icon='close-thick'
                    // iconColor={MD3Colors.error50}
                    size={25}
                    onPress={closeModal}
                    style={{ margin: 0, padding: 0 }}
                />
            </View>
            {/* <Time time={image.createdAt} /> */}
        </View>
    )

    const renderTitle = () => (
        <View
            style={{
                // flex: 1,
                // paddingLeft: 15,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                // paddingVertical: 5,
            }}
        >
            <UserAvatar user={image.user} size={40} />
            
            <View style={{ flexGrow: 1 }}>

                <Text variant='titleLarge'>
                    {image.user.username}
                </Text>

                <Time time={image.createdAt} />

            </View>

            <IconButton
                icon='close-thick'
                size={25}
                onPress={closeModal}
                style={{ alignSelf: 'flex-start' }}
            />

        </View>
    )

    const [maxDims, setMaxDims] = useState(null)
    const [imageDims, setImageDims] = useState(null)

    useEffect(() => {
        if (maxDims) {
            const dims = getImageDims(image)
            setImageDims(dims)
        }
    }, [maxDims])

    const getMinSize = (dims, maxDims) => {

    }
    
    const getImageDims = image => {

        let height = image.height
        let width = image.width

        const maxAreaPercentage = 0.66

        let maxHeight = landscape ? maxDims.height : maxDims.height * maxAreaPercentage
        let maxWidth =  landscape ? maxDims.width * maxAreaPercentage : maxDims.width

        const orientation = width > height ? 'landscape' : 'portrait'

        let scale = 1

        if (width > maxWidth) {
            scale = maxWidth / width
            width *= scale
            height *= scale
        }
        
        if (height > maxHeight) {
            scale = maxHeight / height
            width *= scale
            height *= scale
        }
        
        return { height, width }
    }

    const onLayout = e => {
        
		if (e.nativeEvent.target.offsetParent) {
            
            setMaxDims({
                width: e.nativeEvent.target.offsetParent.clientWidth,
                height: e.nativeEvent.target.offsetParent.clientHeight,
            })
		}
	}

    return image && (
        <View
            style={{ flex: 1,
                // borderWidth: 1, borderColor: 'yellow',
            }}
        >
            {!landscape && (
                <CardHeader
                    user={image.user}
                    close={closeModal}
                    time={image.createdAt}
                />
            )}

            <View
                onLayout={onLayout}
                style={{
                    flex: 1,
                    flexDirection: landscape ? 'row' : 'column',
                    alignItems: landscape ? 'center' : null,
                    // borderWidth: 5, borderColor: 'blue', borderStyle: 'dotted',
                    // alignItems: 'stretch',
                }}
            >

                {imageDims && (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: landscape ? 'row' : 'column',
                            // alignItems: 'space-between',
                        }}
                    >
                        <View
                            style={{
                                width: imageDims.width,
                                height: imageDims.height,
                                marginHorizontal: 'auto',
                            }}
                        >
                            <Image
                                source={source}
                                resizeMode={'contain'}
                                style={{ flex: 1 }}
                            />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                maxHeight: landscape ? imageDims.height : null,
                                // borderWidth: 3, borderColor: 'yellow', borderStyle: 'dashed',
                            }}
                        >
                            {landscape && (
                                <CardHeader
                                    user={image.user}
                                    close={closeModal}
                                    time={!image.createdAt}
                                />
                            )}

                            <View
                                style={{ flexGrow: 1 }}
                            >
                                <ScrollView
                                    style={{
                                        flex: 1,
                                        flexShrink: 1,
                                        marginVertical: 0,
                                        marginHorizontal: 15,
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingVertical: 10,
                                    }}
                                >
                                    {image.caption && (
                                        <Text variant='bodyMedium' style={{ flexShrink: 1 }}>
                                            {image.caption}
                                        </Text>
                                    )}
                                </ScrollView>
                                
                                {(isOwner || hasAuthorization) && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        
                                        {isOwner && (
                                            <IconButton
                                                icon={
                                                    image.caption
                                                        ? 'message-plus-outline'
                                                        : 'comment-edit-outline'
                                                }
                                                onPress={() => setModal('CAPTION', image)}
                                            />
                                        )}
                                        
                                        {isOwner && (
                                            <IconButton
                                                icon={isProfileImage ? 'face-man' : 'face-recognition'}
                                                onPress={handleAvatar}
                                                disabled={loading}
                                                size={30}
                                            />
                                        )}
                                        
                                        <IconButton 
                                            icon='delete-circle'
                                            onPress={handleDelete}
                                            disabled={loading}
                                            iconColor={MD3Colors.error50}
                                            size={30}
                                        />

                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )

    return image && (
        <View style={{ flex: 1 }}>
            
            {!landscape && renderTitle()}

            <View
                style={{
                    flex: 1,
                    flexGrow: landscape ? 0 : 1,
                    flexDirection: landscape ? 'row' : 'column',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexGrow: 2,
                        flexShrink: 2,
                    }}
                >

                    <Image
                        source={source}
                        resizeMode='contain'
                        style={{ flex: 1 }}
                    />

                </View>

                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        flexShrink: 2,
                    }}
                >

                    {landscape && renderHeader(image)}

                    <ScrollView
                        style={{
                            // flex: 1,
                            marginVertical: 0,
                            marginHorizontal: 15,
                        }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingVertical: 10,
                        }}
                    >
                        {image.caption && (
                            <Text variant='bodyMedium'>
                                {image.caption}
                            </Text>
                        )}
                    </ScrollView>
        
                    {(isOwner || hasAuthorization) && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            
                            {isOwner && (
                                <IconButton
                                    icon={
                                        image.caption
                                            ? 'message-plus-outline'
                                            : 'comment-edit-outline'
                                    }
                                    onPress={() => console.log('pressed')}
                                />
                            )}

                            {isOwner && (
                                <Button
                                    mode='text'
                                    onPress={handleAvatar}
                                    compact={true}
                                >
                                    {isProfileImage ? 'Unset Avatar' : 'Set Avatar'}
                                </Button>
                            )}
                            
                            <IconButton 
                                icon='delete-circle'
                                onPress={handleDelete}
                                disabled={loading}
                                iconColor={MD3Colors.error50}
                                size={30}
                            />

                        </View>
                    )}

                </View>

            </View>

        </View>
    )
}

export default ImageCard