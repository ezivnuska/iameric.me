import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
    Easing,
	useAnimatedStyle,
	useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler'

const Touch = () => {

    const SIZE = 100

    const [dragging, setDragging] = useState(false)
    const [perimeter, setPerimeter] = useState()

    const { width, height } = useMemo(() => perimeter || { width: 0, height: 0 }, [perimeter])

    // TODO: move to utilities
    const clamp = (val, min, max) => {
        return Math.min(Math.max(val, min), max)
    }
    
    const translationX = useSharedValue(0)
    const translationY = useSharedValue(0)
    const prevTranslationX = useSharedValue(0)
    const prevTranslationY = useSharedValue(0)

    const animatedStyles = useAnimatedStyle(() => ({
        backgroundColor: 'red',
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
        ],
    }))

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            setDragging(true)
            prevTranslationX.value = translationX.value
            prevTranslationY.value = translationY.value
        })
        .onUpdate((event) => {
            const maxTranslateX = width / 2 - 50
            const maxTranslateY = height / 2 - 50

            translationX.value = clamp(
                prevTranslationX.value + event.translationX,
                -maxTranslateX,
                maxTranslateX
            )

            translationY.value = clamp(
                prevTranslationY.value + event.translationY,
                -maxTranslateY,
                maxTranslateY
            )
        })
        .onEnd(() => {
            setDragging(false)
        })
        .runOnJS(true)

    const onLayout = e => {
        const { clientWidth, clientHeight } = e.nativeEvent.target
        setPerimeter({ width: clientWidth, height: clientHeight })
    }
    
    return (
        <GestureHandlerRootView style={styles.container} onLayout={onLayout}>

            {perimeter && (
                <GestureDetector gesture={pan}>
                    <Animated.View
                        style={[
                            animatedStyles,
                            styles.box,
                            (dragging && { backgroundColor: 'red' }),
                        ]}
                    />
                </GestureDetector>
            )}

        </GestureHandlerRootView>
    )
}

export default Touch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
        borderRadius: 20,
    },
  })