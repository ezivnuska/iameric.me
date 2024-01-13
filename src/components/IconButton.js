import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ onPress, disabled, align = 'center', iconAlignment = 'left', bgColor = 'transparent', label = null, iconName = null }) => (
    <Pressable
        onPress={onPress}
        disabled={disabled}
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: align,
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 15,
            backgroundColor: bgColor,
            borderRadius: 6,
            textAlign: 'center',
            marginVertical: 10,
            // borderWidth: 1,
            // borderColor: '#f00',
        }}
    >
        {(iconName && iconAlignment === 'left') && (
            <Icon
                name={iconName}
                size={16}
                color='#fff'
                style={[{ flexBasis: 'auto', flexShrink: 1 }]}
            />
        )}

        {label && (
            <Text
                style={[classes.buttonText, { flexBasis: 'auto', flexGrow: 0 }]}
            >
                {label}
            </Text>
        )}

        {(iconName && iconAlignment === 'right') && (
            <Icon
                name={iconName}
                size={16}
                color='#fff'
                style={[{ flexBasis: 'auto', flexShrink: 1 }]}
            />
        )}
    </Pressable>
) 