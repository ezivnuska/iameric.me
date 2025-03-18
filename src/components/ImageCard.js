import React, { useEffect, useMemo, useState } from 'react'
import { Image, Pressable, ScrollView, View } from 'react-native'
import { Card, IconButton, MD3Colors, Text } from 'react-native-paper'
import { SmartAvatar, TappableView } from '@components'
import { Paths } from '@constants'
import { useNotification, useModal, useTheme, useUser } from '@context'
import { deleteImage, loadImage, setAvatar } from '@utils/images'
import { getTime } from '@utils/time'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const CardHeader = ({ user, close, time = null }) => {
    const { landscape, theme } = useTheme()
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                paddingLeft: 15,
                paddingTop: 7,
                paddingBottom: 5,
            }}
        >
            <SmartAvatar
                user={user}
                size={landscape ? 30 : 40}
            />

            <View
                style={{
                    flex: 1,
                    flexDirection: landscape ? 'row' : 'column',
                    alignItems: (landscape && 'center'),
                    gap: (landscape && 15),
                }}
            >
                
                <Text
                    variant='titleMedium'
                >
                    {user.username}
                </Text>

                {time && (
                    <Text
                        variant='titleSmall'
                    >
                        {getTime(time, 'relative')}
                    </Text>
                )}

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

    // const { addNotification } = useNotification()
    const { closeModal, addModal } = useModal()
    const { landscape, theme } = useTheme()
    const { user, getUser, removeImage, setProfileImage, updateUser } = useUser()

    const [detailsVisible, setDetailsVisible] = useState(true)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    const [imageDims, setImageDims] = useState(null)
    
    const currentUser = useMemo(() => image?.user && getUser(image.user._id), [image])
    const isProfileImage = useMemo(() => (currentUser?.profileImage && image) && currentUser.profileImage._id === image._id, [currentUser])
    const isOwner = useMemo(() => image?.user && user._id === image.user._id, [image])
    const hasAuthorization = useMemo(() => user && user.role === 'admin', [user])
    const source = useMemo(() => image?.user && `${Paths.ASSETS}/${image.user.username}/${image.filename}`, [image])

    const opacity = useSharedValue(1)
    const opacityStyle = useAnimatedStyle(() => ({
        opacity: interpolate(opacity.value, [0, 1], [0, 0.8]),
        visibility: detailsVisible ? 'visible' : 'hidden',
    }))

    const fadeIn = () => {
        setDetailsVisible(true)
        opacity.value = withTiming(1, { duration: 250 })
    }

    const fadeOut = () => {
        opacity.value = withTiming(0, { duration: 500 }, () => setDetailsVisible(false))
    }

    const toggleVisibility = () => {
        if (detailsVisible) {
            fadeOut()
        } else {
            fadeIn()
        }
    }

    const anim = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => imageDims ? ({
        width: interpolate(anim.value, [0, 1], [imageDims.width, imageDims.width * 2]),
        height: interpolate(anim.value, [0, 1], [imageDims.height, imageDims.height * 2]),
    }) : {})

    const init = () => {
        if (typeof data === 'string') {
            findImage(data)
        } else {
            findImage(data._id)
        }
    }

    const toggleZoom = () => {
        anim.value = withTiming(Math.abs(anim.value - 1), { duration: 300 })
    }

    useEffect(() => {
        init()
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

    const getAndSetImageDims = (image, maxDims) => {
        const { width, height } = getImageDims(image, maxDims)
        setImageDims({ height: Math.floor(height), width: Math.floor(width) })
    }

    const getImageDims = (image, maxDims) => {

        let height = image.height
        let width = image.width

        let maxHeight = maxDims.height < height ? maxDims.height : height
        let maxWidth =  maxDims.width < width ? maxDims.width : width

        if (maxHeight > height) maxHeight = height
        if (maxWidth > width) maxWidth = width

        let scale = 1

        if (landscape) {

            if (height > maxHeight) {
                scale = maxHeight / height
                width *= scale
                height *= scale
            }

            if (width > maxWidth) {
                scale = maxWidth / width
                width *= scale
                height *= scale
            }

        } else {

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
        }
        
        return {
            height: Math.floor(height),
            width: Math.floor(width),
        }
    }

    
    const handleAvatar = async () => {

        const imageIsAvatar = image && image._id === currentUser.profileImage?._id
        
        const imageId = !imageIsAvatar ? image._id : null
        
        setLoading(true)

        const { profileImage } = await setAvatar(currentUser._id, imageId)
        
        setLoading(false)

        updateUser({ ...user, profileImage })

        setProfileImage(profileImage)
        
    }
    
    const handleDelete = async () => {
    
        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setLoading(true)

        const { deletedImage } = await deleteImage(data._id)
        
        setLoading(false)

        if (deletedImage) {
            
            removeImage(deletedImage.user, deletedImage._id)

            // console.log('user', user)
            // console.log('filteredImages', filteredImages)
            // const filteredImages = user.images.filter(img => img._id !== deletedImage._id)
            // updateUser({
            //     _id: user._id,
            //     images: filteredImages,
            // })
            
            closeModal()

        } else {

            console.log('Error deleting image.')
        }

    }

    const onLayout = e => {
        
		getAndSetImageDims(image, {
            width: e.nativeEvent.target.clientWidth,
            height: e.nativeEvent.target.clientHeight,
        })
	}

    return image && (
        <View
            onLayout={onLayout}
            style={{
                flex: 1,
                backgroundColor: theme.colors.background,
                position: 'relative',
            }}
        >
        
            {!landscape && (
                <Animated.View
                    style={[{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        zIndex: 30,
                        backgroundColor: theme.colors.background,
                    }, opacityStyle]}
                >

                    <CardHeader
                        user={image.user}
                        close={closeModal}
                        time={new Date(image.createdAt)}
                    />
                </Animated.View>
            )}

            <TappableView
                onSingle={toggleVisibility}
                onDouble={toggleZoom}
                style={{
                    flex: 1,
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 20,
                }}
            />
            
            {imageDims && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Animated.View
                        style={[{
                        }, animatedStyle]}
                    >
                        <Image
                            source={source}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode='contain'
                        />
                    </Animated.View>
                </View>
            )}

            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0, right: 0, left: 0,
                    zIndex: 200,
                    backgroundColor: theme.colors.background,
                    // backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }, opacityStyle]}
            >

                {landscape && (
                    <CardHeader
                        user={currentUser}
                        close={closeModal}
                        time={image.createdAt}
                    />
                )}
            
            </Animated.View>

            <Animated.View
                style={[{
                    position: 'absolute',
                    bottom: 0, right: 0, left: 0,
                    zIndex: 300,
                    backgroundColor: theme.colors.background,
                    // backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }, opacityStyle]}
            >
                {image.caption && (
                    <ScrollView
                        style={{
                            flex: 1,
                            marginVertical: 0,
                            marginHorizontal: 10,
                        }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingVertical: 10,
                        }}
                    >
                        <Text
                            variant='bodyMedium'
                        >
                            {image.caption}
                        </Text>

                    </ScrollView>
                )}

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
                                onPress={() => addModal('CAPTION', image)}
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
            </Animated.View>
        </View>
    )
}

export default ImageCard