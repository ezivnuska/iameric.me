import React from 'react'
import {
    Pressable,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '@context'

export default ({
    onPress,
    disabled,
    type = 'default',
    padded = true,
    justify = 'center',
    alignIcon = 'left',
    transparent = false,
    label = null,
    iconName = null,
    textStyles = null,
    outline = false,
    ...props
}) => {

    const { theme } = useApp()

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
            style={[
                {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: justify,
                    alignItems: 'center',
                    flexShrink: 0,
                    flexGrow: 0,
                    paddingVertical: 2,
                    paddingHorizontal: transparent || !padded ? 0 : 10,
                    backgroundColor: transparent ? 'transparent' : getBackgroundColor(),
                    borderRadius: 10,
                    shadowColor: outline ? theme?.colors.shadow : 'none',
                    shadowOffset: outline ? ({
                        width: 0,
                        height: 0,
                    }) : null,
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    elevation: 1,
                    borderColor: theme?.colors.border,
                    textAlign: 'center',
                    paddingVertical: 5,
                    outlineColor: 'none',
                    outlineStyle: 'none',
                    // flexBasis: 'min-content',
                    maxWidth: 200,
                },
                {...props.style},
            ]}
        >
            {(type === 'danger' || (iconName && alignIcon === 'left')) && (
                <Icon
                    name={type === 'danger' ? iconName ? iconName : 'skull-outline' : iconName}
                    size={textStyles ? textStyles.fontSize : 20}
                    color={type === 'primary' || type === 'danger' ? theme?.colors.buttonPrimaryLabel : theme?.colors.buttonLabel}
                    style={[
                        {
                            flexBasis: 'auto',
                            flexShrink: 1,
                            flexGrow: 0,
                            marginRight: alignIcon === 'left' && label ? 5 : 0,
                        },
                    ]}
                />
            )}

            {label && (
                <ThemedText
                    style={[
                        {
                            fontSize: 16,
                            flexBasis: 'auto',
                            flexShrink: 1,
                            color: transparent
                                ? theme?.colors.textDefault
                                : type === 'primary' || type === 'danger'
                                    ? theme?.colors.buttonPrimaryLabel
                                    : theme?.colors.buttonLabel,
                            letterSpacing: 0,
                            lineHeight: 22,
                            // paddingHorizontal: iconName && alignIcon === 'right' ? 5 : 0,
                        },
                        textStyles,
                    ]}
                    bold
                >
                    {label}
                </ThemedText>
            )}

            {(iconName && alignIcon === 'right') && (
                <Icon
                    name={iconName}
                    size={24}
                    color={type === 'primary' ? theme?.colors.buttonPrimaryLabel : theme?.colors.buttonLabel}
                    style={{
                        flexBasis: 'auto',
                        fontWeight: 800,
                        marginLeft: 5,
                    }}
                />
            )}
        </Pressable>
    )
}