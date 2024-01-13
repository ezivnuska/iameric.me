import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ onPress, disabled, bgColor = 'transparent', label = null, iconName = null }) => (
    <Pressable
        onPress={onPress}
        disabled={disabled}
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 15,
            backgroundColor: bgColor,
            borderRadius: 6,
            textAlign: 'center',
            marginVertical: 10,
        }}
    >
        {iconName && (
            <Icon
                name={iconName}
                size={16}
                color='#fff'
                style={[{ flexBasis: 'auto', flexShrink: 1 }]}
            />
        )}

        {label && (
            <Text
                style={[classes.buttonText, { flexBasis: 'auto', flexShrink: 1 }]}
            >
                {label}
            </Text>
        )}
    </Pressable>
) 