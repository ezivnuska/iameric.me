import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Easing,
    Pressable,
    View,
} from 'react-native'
import { ThemedText } from '@components'

const Switch = () => {
    const [ state, setState ] = useState(false)
    const transition = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(transition, {
            toValue: state,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.bounce,
        }).start()
    }, [state])
    
    const toggle = () => {
        setState(!state)
    }

    const renderLabel = (label, active) => {
        console.log('active', active)
        return (
            <ThemedText
                align='center'
                style={{ flex: 1 }}
                color={active ?  '#000' : '#fff'}
            >
                {label}
            </ThemedText>
        )
    }

    return (
        <Pressable
            onPress={toggle}
            style={{
                // flex: 1,
                height: 50,
                // width: '100%',
                position: 'relative',
                background: 'yellow',
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 50,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 100,
                }}
            >
                {renderLabel('One Way', state)}
                {renderLabel('The Other Way', !state)}
            </View>
            <Animated.View
                style={{
                    width: '50%',
                    top: 0,
                    height: 50,
                    left: transition.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200],
                    }),
                    zIndex: 10,
                    backgroundColor: 'tomato',
                }}
            />
        </Pressable>
    )
}

export default Switch