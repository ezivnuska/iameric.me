import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ label, onPress, bgColor = 'transparent', iconName = null }) => {
    console.log('bgColor', bgColor)
    return (
        <Pressable
            onPress={onPress}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 5,
                backgroundColor: bgColor,
                borderRadius: 6,
                textAlign: 'center',
                marginVertical: 10,
            }}
        >
            <Icon
                name={iconName}
                size={16}
                color='#fff'
                style={[{ flexBasis: 'auto', flexShrink: 1 }]}
            />

            <Text
                style={[classes.buttonText, { flexBasis: 'auto', flexShrink: 1 }]}
            >
                {label}
            </Text>
        </Pressable>
    )
} 