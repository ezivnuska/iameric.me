import React from 'react'
import { View } from 'react-native'
import { IconButtonLarge, ProfileImage, DefaultText, Time } from '@components'
import LinearGradient from 'react-native-web-linear-gradient'

const ImageOverlayHeader = ({ image, onClose, ...props }) => {
    
    return (
        <LinearGradient
            {...props}
            colors={[
                'rgba(0, 0, 0, 0.9)',
                'rgba(0, 0, 0, 0.7)',
            ]}
            style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                paddingBottom: 20,
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
            }}
        >
            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: 10,
                    paddingVertical: 5,
                }}
            >
                <ProfileImage
                    contact={image.user}
                    size={50}
                />

                <View style={{ flexGrow: 1 }}>

                    <DefaultText
                        size={20}
                        color='#fff'
                        bold
                        style={{ lineHeight: 25 }}
                    >
                        {image.user.username}
                    </DefaultText>

                    <Time
                        time={image.createdAt}
                        color='#fff'
                        prefix='Uploaded '
                        style={{ lineHeight: 25 }}
                    />

                </View>

            </View>

            <IconButtonLarge
                name='close'
                onPress={onClose}
                size={32}
                color='#fff'
                transparent
            />

        </LinearGradient>
    )
}

export default ImageOverlayHeader