import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const DURATION = 10000

const NotificationListItem = ({ text, remove, ...props }) => {

    const opacity = useSharedValue(0)
    const height = useSharedValue(1)

    let timer = null
    
    const opacityStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }))

    const heightStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: height.value }],
    }))

    useEffect(() => {
        startTimer()
        fadeIn()
    }, [])

    const fadeIn = () => {
        opacity.value = withTiming(1, { duration: 250 })
    }

    const fadeOut = () => {
        opacity.value = withTiming(0, { duration: 500 }, () => stopTimerAndRemove())
    }

    // const shrink = () => {
    //     height.value = withTiming(0, { duration: 250, easing: Easing.in }, () => stopTimerAndRemove())
    // }

    const stopTimerAndRemove = () => {
        clearTimeout(timer)
        timer = undefined
        remove()
    }

    const startTimer = () => {
        timer = setTimeout(fadeOut, DURATION)
    }

    const shadow = {
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    }

    return (
        <Animated.View
            {...props}
            style={[
                {
                    borderRadius: 10,
                    marginBottom: 5,
                    background: 'rgba(0, 155, 0, 0.8)',
                    zIndex: 100,
                },
                // heightStyle,
                opacityStyle,
                shadow,
            ]}
        >
            <Pressable
                onPress={fadeOut}
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text variant='titleLarge'>{text}</Text>
            </Pressable>
        </Animated.View>
    )
}

export default NotificationListItem