import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { IconButton, ThemedText } from '@components'
import { useContacts } from '@contacts'
import { useUser } from '@user'
import { deleteImage } from '@utils/images'

const ImageControlPanel = ({ image, onClose }) => {
    
    const { user } = useUser()

    const {
        contact,
        removeImage,
        updateContact,
    } = useContacts()

    const [imageLoading, setImageLoading] = useState(false)
    
    const profileImage = useMemo(() => contact && contact.profileImage, [contact])
    const isProfileImage = useMemo(() => profileImage && profileImage._id === image._id, [profileImage])

    const clearContactProfileImage = () => {
        updateContact({
            _id: contact._id,
            profileImage: null,
        })
    }
    
    const handleDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setImageLoading(true)
        const deletedImage = await deleteImage(image._id, isProfileImage)
        setImageLoading(false)

        if (!deletedImage) console.log('Error deleting image.')
        else {
            removeImage(deletedImage._id)

            if (isProfileImage) clearContactProfileImage()

            onClose()
        }
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                // alignItems: 'center',
                gap: 10,
                // height: '50%',
                paddingHorizontal: 10,
                paddingVertical: 20,
            }}
        >

            <View style={{ flexGrow: 1 }}>
                <ThemedText
                    size={20}
                    color='#fff'
                >
                    {image.caption}
                </ThemedText>
            </View>

            {(user.role === 'admin') && (
                <IconButton
                    name='trash-outline'
                    size={24}
                    color='purple'
                    onPress={handleDelete}
                    disabled={imageLoading}
                />
            )}

        </View>
    )
}

export default ImageControlPanel