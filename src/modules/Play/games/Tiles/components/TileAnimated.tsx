import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	// withDecay,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { SquareWithLabel } from '.'

const TileAnimated = ({
    dragging,
    label,
    offset,
    pan,
    size,
    style,
    // onTouchStart,
    // onTouchMove,
    // onTouchEnd,
    ...props
}) => {

    const { x, y } = offset

    // const pan = Gesture.Pan()
    //     .runOnJS(true)
    //     .onBegin(onTouchStart)
    //     .onChange(onTouchMove)
    //     .onFinalize(onTouchEnd)
    
    useEffect(() => {
        console.log(`${label} is ${dragging ? '' : 'NOT'} dragging`)
    }, [dragging])
    
    return (
        <Animated.View
            {...props}
            style={[
                {
                    position: 'absolute',
                    top: y,
                    left: x,
                    height: size,
                    width: size,
                    overflow: 'hidden',
                    borderRadius: 8,
                },
                (style || null),
                // dragging ? {
                //     backgroundColor: 'red',
                //     transform: [
                //         { translateX: x },
                //         { translateY: y },
                //         // { scale: withTiming(pressed.value ? 1.2 : 1) },
                //     ]
                // } : null,
            ]}
        >
            <SquareWithLabel label={label} size={size} />
        </Animated.View>
    )
}

export default TileAnimated