import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    Animated,
    Easing,
    Pressable,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Field = ({ children, focused = false, ...props }) => {
    
    const transition = useRef(new Animated.Value(focused ? 1 : 0)).current

    return (
        <Animated.View
            {...props}
            style={{
                flex: 1,
                height: transition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 200],
                }),
            }}
        >
            {children}
        </Animated.View>
    )
}

export default ({ children }) => {

    const [ focused, setFocused ] = useState(0)
    
    // const transition = useRef(new Animated.Value(0)).current
    
    // useEffect(() => {
    //     animate(state)
    // }, [state])

    // const animate = index => {
	// 	Animated.timing(transition, {
	// 		toValue: index === focused ? 1 : 0,
	// 		duration: 500,
	// 		useNativeDriver: true,
    //         easing: Easing.inOut(Easing.quad),
	// 	}).start()
    // }

    return (
        <View
            style={{
                flex: 1,
                flexGrow: 1,
                borderWidth: 1,
            }}
        >
            {children.map((child, index) => (
                <Field
                    focused={index === focused}
                    key={`field-${index}`}
                >
                    {child}
                </Field>
            ))}

        </View>
    )
}