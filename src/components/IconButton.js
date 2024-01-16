import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ onPress, disabled, padded = true, align = 'center', alignIcon = 'left', bgColor = 'transparent', label = null, iconName = null, textStyles = null }) => (
    <Pressable
        onPress={onPress}
        disabled={disabled}
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: align,
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: padded ? 15 : 0,
            backgroundColor: bgColor,
            borderRadius: 6,
            textAlign: 'center',
            marginVertical: 10,
            // borderWidth: 1,
            // borderColor: '#f00',
        }}
    >
        {(iconName && alignIcon === 'left') && (
            <Icon
                name={iconName}
                size={16}
                color='#fff'
                style={{ flexBasis: 'auto', flexShrink: 1, marginRight: 0 }}
            />
        )}

        {label && (
            <Text
                style={[
                    classes.buttonText,
                    { flexBasis: 'auto', flexGrow: 0 },
                    textStyles || null,
                ]}
            >
                {label}
            </Text>
        )}

        {(iconName && alignIcon === 'right') && (
            <Icon
                name={iconName}
                size={16}
                color='#fff'
                style={[{ flexBasis: 'auto', flexShrink: 1, marginLeft: 5 }]}
            />
        )}
    </Pressable>
) 