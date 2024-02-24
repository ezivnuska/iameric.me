import React from 'react'
import {
    Pressable,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'

export default ({
    onPress,
    disabled,
    type = 'default',
    padded = true,
    align = 'center',
    alignIcon = 'left',
    transparent = false,
    label = null,
    iconName = null,
    textStyles = null,
    outline = false,
    ...props
}) => {

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
                // flex: 1,
                flexShrink: 0,
                flexGrow: 0,
                // minWidth: 180,
                // marginVertical: 5,
                paddingRight: padded ? 8 : 0,
                // paddingVertical: 3,
                paddingLeft: align === 'left' ? 0 : padded ? 8 : 0,
                backgroundColor: transparent ? 'transparent' : getBackgroundColor(),
                borderRadius: 10,
                borderWidth: outline ? 1 : 0,
                borderColor: theme?.colors.border,
                textAlign: 'center',
                // height: padded ? 30 : 'auto',
                ...props.style,
            }}
        >
            {(type === 'danger' || (iconName && alignIcon === 'left')) && (
                <Icon
                    name={type === 'danger' ? 'skull-outline' : iconName}
                    size={18}
                    color={theme?.colors.backButtonLabel}
                    style={[
                        {
                            flexBasis: 'auto',
                            flexShrink: 1,
                            flexGrow: 0,
                            lineHeight: 30,
                            marginRight: label ? 5 : 0,
                        },
                        textStyles,
                    ]}
                />
            )}

            {label && (
                <ThemedText
                    style={[
                        {
                            fontSize: 18,
                            flexBasis: 'auto',
                            flexGrow: 0,
                            flexShrink: 0,
                            color: transparent ? theme?.colors.textDefault : theme?.colors.buttonLabel,
                            lineHeight: 30,
                            letterSpacing: 0,
                            marginHorizontal: align === 'left' ? 0 : 8,
                        },
                        textStyles || {},
                    ]}
                    bold
                >
                    {label}
                </ThemedText>
            )}

            {(iconName && alignIcon === 'right') && (
                <Icon
                    name={iconName}
                    size={18}
                    color={ textStyles?.color || theme?.colors.textDefault }
                    style={{
                        flexBasis: 'auto',
                        flexShrink: 1,
                        lineHeight: 30,
                        marginLeft: 8,
                    }}
                />
            )}
        </Pressable>
    )
}