import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import {
    ActivityIndicator,
    IconButtonLarge,
    ImageContainer,
    ProfileImage,
    ThemedText,
    Time,
} from '@components'
import { ImageControlPanel } from './components'
import { loadImage } from '@utils/images'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-web-linear-gradient'

const ContactImageDisplay = ({ data, user, onClose }) => {

    const [imageLoading, setImageLoading] = useState(false)

    const [image, setImage] = useState(null)

    const [controlsVisible, setControlsVisible] = useState(true)

    const controlOpacity = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: controlOpacity.value,
    }))

    const init = async id => {
        setImageLoading(true)
        const loadedImage = await loadImage(id)
        setImageLoading(false)
        
        if (loadedImage) setImage(loadedImage)
    }

    useEffect(() => {
        if (data) init(data._id)
    }, [])

    const handleControls = () => {
        if (controlsVisible) {
            controlOpacity.value = withTiming(0, { duration: 500 }, () => setControlsVisible(false))
        } else {
            setControlsVisible(true)
            controlOpacity.value = withTiming(1, { duration: 500 })
        }
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#000',
            }}
        >

            {image ? (
                <View
                    style={{
                        flex: 1,
                        position: 'relative',
                    }}
                >

                    <Pressable
                        onPress={handleControls}
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1,
                        }}
                    >
                        <ImageContainer image={image} />
                    </Pressable>

                    <Animated.View
                        style={[{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            display: controlsVisible ? 'block' : 'none',
                            zIndex: 100,
                        }, animatedStyle]}
                    >
                        <LinearGradient
                            colors={[
                                'rgba(0, 0, 0, 1.0)',
                                'rgba(0, 0, 0, 0.6)',
                            ]}
                            style={{
                                flexDirection: 'row',
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                            }}
                        >
                            <View
                                style={{
                                    flexGrow: 1,
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                    gap: 10,
                                }}
                            >
                                <ProfileImage
                                    user={user}
                                    size={50}
                                />

                                <View style={{ flexGrow: 1 }}>

                                    <ThemedText
                                        size={20}
                                        color='#fff'
                                        bold
                                        style={{ lineHeight: 25 }}
                                    >
                                        {user.username}
                                    </ThemedText>

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
                                size={40}
                                color='#fff'
                                transparent
                            />

                        </LinearGradient>

                    </Animated.View>

                    <Animated.View
                        style={[{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: controlsVisible ? 'block' : 'none',
                            zIndex: 101,
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        }, animatedStyle]}
                    >
                        <LinearGradient
                            colors={[
                                'rgba(0, 0, 0, 0.6)',
                                'rgba(0, 0, 0, 1.0)',
                            ]}
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 20,
                            }}
                        >
                            <ImageControlPanel
                                image={image}
                                onClose={onClose}
                            />
                        </LinearGradient>
                    </Animated.View>
                    
                </View>
            ) : <ActivityIndicator />}
        </View>
    )
}

export default ContactImageDisplay