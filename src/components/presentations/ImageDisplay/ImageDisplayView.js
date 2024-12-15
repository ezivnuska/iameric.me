import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { ImageOverlayFooter, ImageOverlayHeader } from './components'
import { ImageMax } from '@components'
import { useModal, useUser } from '@context'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const ImageDisplayView = ({
    disabled,
    image,
    onClose,
    onDelete,
    owner,
}) => {

    const { closeModal } = useModal()
    const { user } = useUser()

    const [controlsVisible, setControlsVisible] = useState(true)

    const controlOpacity = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: controlOpacity.value,
    }))

    const toggleControls = () => {
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
            <Pressable
                onPress={toggleControls}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000',
                    zIndex: 1,
                }}
            >
                <ImageMax image={image} />
            </Pressable>

            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                }, animatedStyle]}
            >
                <ImageOverlayHeader
                    image={image}
                    onClose={onClose}
                />
            </Animated.View>
                    
            <Animated.View
                style={[{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 20,
                }, animatedStyle]}
            >
                <ImageOverlayFooter
                    disabled={disabled}
                    image={image}
                    onClose={closeModal}
                    onDelete={onDelete}
                    owner={owner}
                />
            </Animated.View>
                
        </View>
    )
}

export default ImageDisplayView