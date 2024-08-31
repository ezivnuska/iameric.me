import React from 'react'
import { View } from 'react-native'
import { ThumbListItem } from './components'
import { ThemedText } from '@components'

export default ({ images, bipId = null, disabled = false, small = false }) => {
    const imageSize = 50
    
    return (
        <View
            style={{
                // flex: 1,
                position: 'relative',
                height: imageSize,
                width: imageSize,
            }}
        >
            <ThumbListItem
                path={`${images[0].path}/${images[0].filename}`}
                size={imageSize}
            />

            <ThemedText
                size={imageSize * 0.6}
                color='#fff'
                align='center'
                bold
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    width: imageSize,
                    lineHeight: imageSize,
                }}
            >
                {images.length}
            </ThemedText>

        </View>
    )
}