import React, { useContext } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    EmptyStatus,
    ThemedText,
} from '.'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'
import { AppContext } from '../AppContext'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images, username, onSelected }) => {

    const theme = useTheme()

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

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

    const showUploadButton = username => {
        if (username === user.username) return true
        switch(username) {
            case 'Customer':
            case 'Driver':
            case 'Vendor':
                return false
                break
            default:
                return true
        }
    }
    
    return images && images.length
        ? (
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 8,
                    width: '100%',
                }}
            >
                {images.map((image, index) => (
                    <Pressable
                        key={`image-${index}`}
                        onPress={() => onSelected(image)}
                        disabled={loading}
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
                            source={{ uri: `${IMAGE_PATH}/${username}/thumb/${image.filename}` }}
                            style={{
                                resizeMode: 'cover',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Pressable>
                ))}
                {showUploadButton(username) && (
                    <Pressable
                        key={`image-${images ? images.length : '0'}`}
                        onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SELECT_IMAGE' })}
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
        ) : null
        {!showUploadButton(username)
            ? (
                <EmptyStatus status='No images to display.' />
            ) : null
        }
}