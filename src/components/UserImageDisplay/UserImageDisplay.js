import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import {
    ActivityIndicator,
    IconButtonLarge,
    ImageContainer,
    ThemedText,
} from '@components'
import { ImageControlPanel } from './components'
import { loadImage } from '@utils/images'
import { useImages } from '@images'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

const UserImageDisplay = ({ data }) => {
    
    const {
        setImagesLoading,
        closeImagesModal,
    } = useImages()

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
                position: 'relative',
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
                            display: controlsVisible ? 'block' : 'none'
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
                            paddingVertical: 10,
                            display: controlsVisible ? 'block' : 'none',
                        }, animatedStyle]}
                    >
                        <View style={{ paddingHorizontal: 10 }}>
                            <ThemedText color='#fff'>{image.caption}</ThemedText>
                        </View>
                        <ImageControlPanel image={image} />
                    </Animated.View>
                    
                </View>
            ) : <ActivityIndicator />}
        </View>
    )
}

export default UserImageDisplay