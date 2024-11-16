import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import {
    ActivityIndicator,
    IconButtonLarge,
    ImageContainer,
} from '@components'
import { ImageControlPanel } from './components'
import { loadImage } from '@utils/images'
import { useImages } from '@images'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-web-linear-gradient'

const UserImageDisplay = ({ data }) => {
    
    const {
        setImagesLoading,
        closeImagesModal,
    } = useImages()

    const [image, setImage] = useState(null)

    const [maxHeight, setMaxHeight] = useState(null)
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

    const onLayout = e => {
        if (e.nativeEvent.target.offsetParent) {
            const parentHeight = e.nativeEvent.target.offsetParent.clientHeight
            setMaxHeight(parentHeight)
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
                    onLayout={onLayout}
                    style={{
                        flex: 1,
                        position: 'relative',
                    }}
                >
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={handleControls}
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
                            // paddingHorizontal: 10,
                        }, animatedStyle]}
                    >
                        <LinearGradient
                            colors={[
                                'rgba(0, 0, 0, 0.2)',
                                'rgba(0, 0, 0, 0.05)',
                                'rgba(0, 0, 0, 0.0)',
                            ]}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    paddingHorizontal: 10,
                                    paddingVertical: 15,
                                }}
                            >
                                <IconButtonLarge
                                    name='close'
                                    onPress={closeImagesModal}
                                    size={40}
                                    color='#fff'
                                    transparent
                                />
                            </View>
                        </LinearGradient>
                        
                    </Animated.View>

                    <Animated.View
                        style={[
                            {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                paddingVertical: 10,
                                display: controlsVisible ? 'block' : 'none',
                            }, {
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 100,
                            },
                            animatedStyle,
                        ]}
                    >
                        <ImageControlPanel image={image} />
                    </Animated.View>
                    
                </View>
            ) : <ActivityIndicator />}
        </View>
    )
}

export default UserImageDisplay