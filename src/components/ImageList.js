import React, { useMemo } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    useApp,
    useModal,
    useUser,
} from '@context'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images, onSelected }) => {

    const { theme } = useApp()
    const { setModal } = useModal()
    const { profile, userLoading } = useUser()

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

    const showUploadButton = () => {
        if (process.env.NODE_ENV === 'development') {
            console.log('cant upload in dev')
            return false
        }
        switch(profile.username) {
            case 'Customer':
            case 'Driver':
            case 'Vendor':
                return false
            default:
                return true
        }
    }
    
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                gap: 8,
                width: '100%',
                marginVertical: 15,
            }}
        >
            {images && images.map((image, index) => (
                <View
                    key={`image-${index}`}
                >
                    
                    <Pressable
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

                </View>
            ))}

            {showUploadButton() && (
                <Pressable
                    key={`image-${images.length}`}
                    onPress={() => setModal({ type: 'SELECT_IMAGE' })}
                    style={[
                        {
                            flexBasis: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: IMAGE_SIZE,
                            height: IMAGE_SIZE,
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