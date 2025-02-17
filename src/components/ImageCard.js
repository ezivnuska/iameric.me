import React, { useEffect, useMemo, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { IconButton, MD3Colors, Text } from 'react-native-paper'
import { useModal, useTheme, useUser } from '@context'
import { deleteImage, loadImage, setAvatar } from '@utils/images'
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

    const { closeModal, setModal } = useModal()
    const { landscape } = useTheme()
    const { user, setDeletedImage, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    const [maxDims, setMaxDims] = useState(null)
    const [imageDims, setImageDims] = useState(null)
    
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

    useEffect(() => {
        init()
    }, [user, data])

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

    useEffect(() => {
        if (maxDims) {
            const dims = getImageDims(image)
            setImageDims(dims)
        }
    }, [maxDims])
    
    const getImageDims = image => {

        let height = image.height
        let width = image.width

        const maxAreaPercentage = 0.66

        let maxHeight = landscape ? maxDims.height : maxDims.height * maxAreaPercentage
        let maxWidth =  landscape ? maxDims.width * maxAreaPercentage : maxDims.width

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
    
    const handleAvatar = async () => {

        const imageIsAvatar = image.user.profileImage && image._id === image.user.profileImage._id
        
        setLoading(true)
        
        const profileImage = await setAvatar(user._id, imageIsAvatar ? null : image._id)
        
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

    return image && (
        <View style={{ flex: 1 }}>

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
                }}
            >

                {imageDims && (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: landscape ? 'row' : 'column',
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
                                style={{ flex: 1 }}
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
}

export default ImageCard