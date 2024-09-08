import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Easing,
    Pressable,
    View,
} from 'react-native'

const Field = ({ color, focused, setFocused, ...props }) => {
    
    const transition = useRef(new Animated.Value(0)).current

    const animate = toValue => {
        Animated.timing(transition, {
			toValue,
			duration: 1000,
			useNativeDriver: true,
			easing: Easing.bounce,
		}).start()
    }

    useEffect(() => {
        if (focused) animate(1)
        else animate(0)
    }, [focused])

    const onPress = () => {
        console.log('onPress', color)
        setFocused()
    }

    return (
        <Animated.View
            {...props}
            style={{
                flexGrow: 1,
                height: transition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 400],
                }),
            }}
        >
            <Pressable
                onPress={onPress}
                style={{
                    flex: 1,
                    flexGrow: 1,
                    backgroundColor: color,
                }}
            />
        </Animated.View>
    )
}

export default () => {

    const [ focused, setFocused ] = useState(0)

    const handleFocus = value => {
        if (value === focused) setFocused(null)
        else setFocused(value)
    }

    return (
        <View style={{ flex: 1 }}>
            
            {['red', 'white', 'blue'].map((color, index) => (
                <Field
                    key={`field-${index}`}
                    index={index}
                    focused={focused === index}
                    setFocused={() => handleFocus(index)}
                    color={color}
                />
            ))}

        </View>
    )
}