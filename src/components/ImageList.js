import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    useApp,
    useContacts,
    useUser,
} from '@context'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images, onSelected }) => {

    const { theme } = useApp()
    const { contact } = useContacts()
    const { profile, setUserModal, userLoading } = useUser()

    const buttonStyle = {
        borderWidth: 1,
        borderColor: theme?.colors.border,
        shadowColor: theme?.colors.shadow,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: theme?.colors.background,
    }

    const isDev = process.env.NODE_ENV === 'development'
    
    const restrictUpload = () => {
        if (userLoading || isDev) return true
        return false
    }
    const hideUpload = () => {
        if (!profile) return true
        switch(profile.username) {
            case 'Customer':
            case 'Driver':
            case 'Vendor':
                return true
            default:
                return contact ? true : false
        }
    }
    
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
                width: '100%',
                marginVertical: 15,
                paddingHorizontal: 10,
            }}
        >
            {images && images.map((image, index) => (
                <Pressable
                    key={`image-${index}`}
                    onPress={() => onSelected(image)}
                    disabled={userLoading}
                    style={[
                        {
                            flexBasis: 'auto',
                            width: IMAGE_SIZE,
                            height: IMAGE_SIZE,
                        },
                        buttonStyle,
                    ]}
                >
                    <Image
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        // source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
                        source={{ uri: `${IMAGE_PATH}/${image.user.username}/thumb/${image.filename}` }}
                        style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </Pressable>

            ))}

            {!hideUpload() && (
                <Pressable
                    key={`image-${images.length}`}
                    onPress={() => setUserModal('SELECT_IMAGE')}
                    disabled={restrictUpload()}
                    style={[
                        {
                            flexBasis: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: IMAGE_SIZE,
                            height: IMAGE_SIZE,
                            opacity: restrictUpload() ? 0.5 : 1,
                        },
                        buttonStyle,
                    ]}
                >
                    <Icon
                        name='add-outline'
                        size={32}
                        color={theme?.colors.textDefault}
                    />

                </Pressable>
            )}
            
        </View>
    )
}