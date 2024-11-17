import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import { SharedImageControlPanel } from './components'
import { ActivityIndicator, IconButtonLarge, ImageContainer } from '@components'
import { useApp } from '@app'
import { useContact } from '@contact'
import { useImages } from '@images'
import { loadImage } from '@utils/images'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-web-linear-gradient'

const SharedImage = ({ data, onClose }) => {

    const { dims } = useApp()
    const { contact } = useContact()
    const { setImagesLoading } = useImages()

    const [image, setImage] = useState(null)

    const [controlsVisible, setControlsVisible] = useState(true)

    const controlOpacity = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: controlOpacity.value,
    }))

    const init = async id => {
        setImagesLoading(true)
        const image = await loadImage(id)
        setImagesLoading(false)
        if (image) setImage(image)
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
                        style={{ flex: 1, zIndex: 1 }}
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
                                'rgba(0, 0, 0, 0.5)',
                                'rgba(0, 0, 0, 0.25)',
                                'rgba(0, 0, 0, 0.1)',
                                'rgba(0, 0, 0, 0.0)',
                            ]}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingHorizontal: 10,
                                paddingVertical: 15,
                            }}
                        >
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
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            height: dims.height / 2,
                        }, animatedStyle]}
                    >
                        <SharedImageControlPanel
                            image={image}
                            user={contact}
                        />

                    </Animated.View>
                    
                </View>
            ) : <ActivityIndicator />}
        </View>
    )
}

export default SharedImage