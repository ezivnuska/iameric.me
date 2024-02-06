import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'

export default ({ onPress, disabled, type = 'default', padded = true, align = 'center', alignIcon = 'left', transparent = false, label = null, iconName = null, textStyles = null, ...props }) => {

    const theme = useTheme()

    const getBackgroundColor = () => {
        if (transparent) return transparent
        if (disabled) return theme?.colors.buttonDisabled
        switch (type) {
            case 'primary': return theme?.colors.buttonPrimary; break
            case 'danger': return theme?.colors.buttonDanger; break
            default: return theme?.colors.buttonDefault
        }
    }

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
                paddingRight: padded ? 10 : 0,
                paddingLeft: align === 'left' ? 0 : padded ? 10 : 0,
                backgroundColor: transparent ? 'transparent' : getBackgroundColor(),
                borderRadius: 6,
                textAlign: 'center',
                ...props.style,
            }}
        >
            {((type === 'danger' || iconName) && alignIcon === 'left') && (
                <Icon
                    name={type === 'danger' ? 'skull-outline' : iconName}
                    size={16}
                    color={ type === 'danger' ? '#fff' : theme?.colors.textDefault }
                    style={{ flexBasis: 'auto', flexShrink: 1, marginRight: label ? 8 : 0 }}
                />
            )}

            {label && (
                <Text
                    style={[
                        classes.buttonText,
                        {
                            flexBasis: 'auto',
                            flexGrow: 0,
                            color: type === 'danger' ? '#fff' : theme?.colors.textDefault,
                        },
                        textStyles || {},
                    ]}
                >
                    {label}
                </Text>
            )}

            {(iconName && alignIcon === 'right') && (
                <Icon
                    name={iconName}
                    size={16}
                    color={ theme?.colors.textDefault }
                    style={[{ flexBasis: 'auto', flexShrink: 1, marginLeft: 5 }]}
                />
            )}
        </Pressable>
    )
}