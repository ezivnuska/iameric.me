import React from 'react'
import { View } from 'react-native'
import { ImageControlPanel } from './components'
import { IconButton, TextCopy } from '@components'
import LinearGradient from 'react-native-web-linear-gradient'

const ImageOverlayFooter = ({ disabled, image, onClose, onDelete, owner, admin = false, props }) => {

    return (
        <LinearGradient
            {...props}
            colors={[
                'rgba(0, 0, 0, 0.7)',
                'rgba(0, 0, 0, 0.9)',
            ]}
            style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
            }}
        >
            {owner
                ? <ImageControlPanel image={image} onClose={onClose} />
                : (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: 10,
                            paddingVertical: 10,
                        }}
                    >

                        {image.caption && (
                            <TextCopy
                                size={20}
                                color='#fff'
                            >
                                {image.caption}
                            </TextCopy>
                        )}

                        {admin && (
                            <IconButton
                                name='trash-outline'
                                size={24}
                                color='purple'
                                onPress={onDelete}
                                disabled={disabled}
                            />
                        )}

                    </View>
                )
            }

        </LinearGradient>
    )
}

export default ImageOverlayFooter