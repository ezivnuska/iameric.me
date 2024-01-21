import React, { useEffect, useState } from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images, loading, username, onSelected, onAddImage }) => (
    <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: 10,
            width: '100%',
            opacity: loading ? 0.5 : 1.0,
        }}
    >
        {images && images.map((image, index) => (
            <Pressable
                onPress={() => onSelected(image._id)}
                style={{
                    // flex: 1,
                    flexBasis: 'auto',
                }}
                key={`image-${index}`}
            >
                <Image
                    width={IMAGE_SIZE}
                    height={IMAGE_SIZE}
                    source={{ uri: `${IMAGE_PATH}/${username}/thumb/${image.filename}` }}
                    style={{
                        resizeMode: 'cover',
                        width: IMAGE_SIZE,
                        height: IMAGE_SIZE,
                        borderWidth: 1,
                        borderColor: '#999',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                />
            </Pressable>
        ))}

        {onAddImage &&
        username !== 'Driver' &&
        username !== 'Customer' &&
        username !== 'Vendor' && (
            <Pressable
                onPress={onAddImage}
                style={{
                    flexBasis: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderWidth: 1,
                    borderColor: '#999',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    backgroundColor: '#000',
                }}
                key={images ? images.length : '0'}
            >
                <Icon name='add-outline' size={32} color='#fff' />
            </Pressable>
        )}
    </View>
)