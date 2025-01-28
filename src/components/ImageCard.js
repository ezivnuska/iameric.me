import React, { useEffect, useMemo, useState } from 'react'
import { Image, View } from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper'
import { useForm, useModal, useTheme, useUser } from '@context'
import { deleteImage, loadImage, setAvatar, setCaption } from '@utils/images'
import { Time } from '@components'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const LeftContent = props => <Avatar.Icon {...props} icon='guy-fawkes-mask' />

const ImageCard = ({ data }) => {

    const { landscape } = useTheme()
    const { clearForm, formError, formFields } = useForm()
    const { closeModal } = useModal()
    const { user, authUser, setDeletedImage, updateImage, updateUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    const source = useMemo(() => image && image.user && `${IMAGE_PATH}/${image.user.username}/${image.filename}`, [image])

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

    return image && (
        <View style={{ flex: 1, gap: 10 }}>
            <Card.Title title={image.user.username} subtitle={<Time time={image.createdAt} />} left={LeftContent} right={() => <Button onPress={closeModal}>Cancel</Button>} />
            
            <Image
                source={source}
                resizeMode='contain'
                style={{ flex: 1, flexGrow: 1 }}
            />
            <Card.Content>
                <Text variant='bodyMedium'>{image.caption}</Text>
            </Card.Content>
            
            <Card.Actions>
                {/* <Button onPress={closeModal}>Cancel</Button>
                <Button>Ok</Button> */}
            </Card.Actions>

        </View>
    )
}

export default ImageCard