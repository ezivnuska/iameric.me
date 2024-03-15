import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
// import {
//     EmptyStatus,
//     ThemedText,
// } from '.'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'
import { AppContext } from '../AppContext'
// import { loadUsers } from '@utils/data'
// import { loadImages } from '@utils/images'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images, username, onSelected }) => {

    const theme = useTheme()

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    // useEffect(() => {
    //     console.log('USER-->', user)
    // }, [user])

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
        if (process.env.NODE_ENV === 'development') return false
        switch(username) {
            case 'Customer':
            case 'Driver':
            case 'Vendor':
                return false
            default:
                return username === user.username
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
            {showUploadButton(user.username) && (
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
    )
}