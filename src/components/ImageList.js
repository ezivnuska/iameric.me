import React, { useEffect, useState } from 'react'
import {
    Image,
    TouchableOpacity,
    View,
} from 'react-native'

const IMAGE_SIZE = 50
const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ images, username, onSelected }) => (
    <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: 10,
            width: '100%',
        }}
    >
        {images.map((image, index) => (
            <TouchableOpacity
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
                        resizeMode: 'stretch',
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
            </TouchableOpacity>
        ))}
    </View>
)