import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, ImageClone } from '@components'

const ImagePreview = ({ uri, height, width, onLoad, progress, uploading }) => {
    
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
        >

            {uploading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 100,
                    }}
                >
                    <ActivityIndicator
                        size='medium'
                        label={`Uploading...\nDo not close window.${progress ? `\n${progress}%` : ''}`}
                        color='#fff'
                    />
                </View>
            )}

            <ImageClone
                onLayout={onLoad}
                source={{ uri }}
                width={width}
                height={height}
                style={{
                    borderWidth: 1,
                    width,
                    height,
                    zIndex: 10,
                }}
            />

        </View>
    )
}

export default ImagePreview