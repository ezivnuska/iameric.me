import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'

export default ({ onPress, disabled, padded = true, align = 'center', alignIcon = 'left', bgColor = 'transparent', label = null, iconName = null, textStyles = null, ...props }) => {

    const theme = useTheme()

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: align,
                alignItems: 'center',
                paddingVertical: 5,
                paddingRight: 5,//padded ? 15 : 0,
                paddingLeft: align === 'left' ? 0 : 5,//padded ? 15 : 0,
                backgroundColor: bgColor,
                borderRadius: 6,
                textAlign: 'center',
                ...props.style,
            }}
        >
            {(iconName && alignIcon === 'left') && (
                <Icon
                    name={iconName}
                    size={16}
                    color={ theme?.colors.textDefault }
                    style={{ flexBasis: 'auto', flexShrink: 1, marginRight: 5 }}
                />
            )}

            {label && (
                <Text
                    style={[
                        classes.buttonText,
                        {
                            flexBasis: 'auto',
                            flexGrow: 0,
                            color: theme?.colors.textDefault,
                        },
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
}