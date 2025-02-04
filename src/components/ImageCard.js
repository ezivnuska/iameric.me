import React, { useEffect, useMemo, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Avatar, Button, Card, IconButton, MD3Colors, Text } from 'react-native-paper'
import { useForm, useModal, useTheme, useUser } from '@context'
import { deleteImage, loadImage, setAvatar, setCaption } from '@utils/images'
import { Time, UserAvatar } from '@components'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const ImageCard = ({ data }) => {

    const { clearForm, formError, formFields } = useForm()
    const { closeModal } = useModal()
    const { landscape } = useTheme()
    const { user, setDeletedImage, updateImage, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    
    const isProfileImage = useMemo(() => image && user.profileImage?._id === image._id, [user])
    const isOwner = useMemo(() => user && image && user._id === image.user._id, [image])
    const hasAuthorization = useMemo(() => user && user.role === 'admin', [user])
    const source = useMemo(() => image && image.user && `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

    useEffect(() => {
        if (typeof data === 'string') {
            console.log('ImageShowcase received _id string')
            findImage(data)
        } else {
            findImage(data._id)
        }
    }, [])

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

        const isProfileImage = image.user.profileImage && image._id === image.user.profileImage._id
        
        setLoading(true)
        
        const profileImage = await setAvatar(user._id, isProfileImage ? null : image._id)
        
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

    const renderTitle = image => (
        <Card.Title
            title={image.user.username}
            subtitle={<Time time={image.createdAt} />}
            left={() => <UserAvatar user={image.user} />}
            right={() => (
                <IconButton 
                    icon='close-thick'
                    // iconColor={MD3Colors.error50}
                    size={25}
                    onPress={closeModal}
                />
            )}
            style={{ flexShrink: 0 }}
        />
    )

    return image && (
        <View
            style={{
                flex: 1,
                // gap: 10,
            }}
        >
            
            {!landscape && renderTitle(image)}
            
            <View
                style={{
                    flex: 1,
                    // flexGrow: 1,
                    flexDirection: landscape ? 'row' : 'column',
                    // alignItems: landscape ? 'center' : 'flex-start',
                }}
            >
                <View style={{ flex: 2, flexGrow: 2, flexShrink: 1 }}>

                    <Image
                        source={source}
                        resizeMode='contain'
                        style={{ 
                            flex: 1,
                            // flexGrow: 1,
                        }}
                    />

                </View>

                <View style={{ flex: 1, flexGrow: 1, flexShrink: 2 }}>

                    {landscape && renderTitle(image)}

                    <ScrollView
                        style={{
                            flex: 1,
                            marginTop: 0,
                        }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                        }}
                    >
                        {image.caption ? (
                            <Text variant='bodyMedium'>
                                {image.caption}
                            </Text>
                        ) : (
                            <Text variant='bodyMedium'>
                                Add a caption...
                            </Text>
                        )}
                    </ScrollView>
        
                    {(isOwner || hasAuthorization) && (
                        <Card.Actions style={{ flexShrink: 0 }}>
                            {isOwner && (
                                <Button
                                    mode='text'
                                    onPress={handleAvatar}
                                >
                                    {isProfileImage ? 'Unset Avatar' : 'Set Avatar'}
                                </Button>
                            )}
                            {(
                                <Button
                                    mode='text'
                                    onPress={handleDelete}
                                    disabled={loading}
                                >
                                    Delete
                                </Button>
                            )}
                        </Card.Actions>
                    )}

                </View>

            </View>

        </View>
    )
}

export default ImageCard