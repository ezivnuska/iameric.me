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
	Easing,
	useAnimatedStyle,
	useSharedValue,
	// withDecay,
	withSpring,
	withTiming,
} from 'react-native-reanimated'

const UserImageDisplay = ({ data }) => {
    
    const {
        setImagesLoading,
        closeImagesModal,
    } = useImages()

    const [image, setImage] = useState(null)

    const [controlsVisible, setControlsVisible] = useState(null)

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

    useEffect(() => {
        if (controlsVisible !== null) controlOpacity.value = withTiming(controlsVisible ? 0 : 1, { duration: 500 })
    }, [controlsVisible])

    // const animate = value => {
    //     Animated.timing(opacity, {
    //         toValue: value,
    //         duration: 3000,
    //         useNativeDriver: true,
    //     }).start()
    // }

    const handleControls = () => {
        setControlsVisible(!controlsVisible)
    }

    return image ? (
        <View
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
                    top: 10,
                    right: 10,
                }, animatedStyle]}
            >
                <IconButtonLarge
                    name='close'
                    onPress={closeImagesModal}
                    size={40}
                    color='tomato'
                    transparent
                />
            </Animated.View>

            <Animated.View
                style={[{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }, animatedStyle]}
            >
                <ImageControlPanel image={image} />
            </Animated.View>
            
        </View>
    ) : <ActivityIndicator />
}

export default UserImageDisplay