import React from 'react'
import { View } from 'react-native'
import { IconButton, ProfileImage, ThemedText, Time } from '@components'
import { useContact } from '@contact'
import { useSocket } from '@socket'
import { useUser } from '@user'
import { deleteImage } from '@utils/images'

const SharedImageControlPanel = ({ image }) => {
    
    const {
        closeContactModal,
        contactLoading,
        setContactLoading,
    } = useContact()

    const { notifySocket } = useSocket()

    const { user } = useUser()
    
    const handleDelete = async () => {

        if (process.env.NODE_ENV === 'development') return alert(`Can't delete in development`)

        setContactLoading(true)
        const deletedImage = await deleteImage(image._id)
        notifySocket('shared_image_deleted', deletedImage)
        setContactLoading(false)

        if (!deletedImage) console.log('Error deleting shared image.')
        else closeContactModal()
    }

    return (
        <View
            style={{
                flex: 1,
                gap: 10,
                height: '50%',
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}
        >
            
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: 10,
                }}
            >
                <ProfileImage
                    user={user}
                    size={50}
                />

                <View style={{ flexGrow: 1 }}>
                    <ThemedText
                        size={20}
                        color='#fff'
                        bold
                        style={{ lineHeight: 25 }}
                    >
                        {user.username}
                    </ThemedText>

                    <Time
                        time={image.createdAt}
                        color='#fff'
                        prefix='Uploaded '
                        style={{ lineHeight: 25 }}
                    />
                </View>

                {(user.role === 'admin') && (
                    <IconButton
                        name='trash-outline'
                        size={24}
                        color='#fff'
                        onPress={handleDelete}
                        disabled={contactLoading}
                    />
                )}

            </View>
        
            <ThemedText color='#fff'>{image.caption || 'No description'}</ThemedText>

        </View>
    )
}

export default SharedImageControlPanel