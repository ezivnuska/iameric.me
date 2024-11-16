
import React from 'react'
import { Pressable } from 'react-native'
import { ThemedText } from '@components'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButtonLarge = ({
    disabled,
    onPress,
    name,
    color = 'tomato',
    label = null,
    size = 18,
    transparent = false,
    ...props
}) => (
    <Pressable
        disabled={disabled}
        onPress={onPress}
        style={[
            {
                flexGrow: 0,
                flexDirection: 'row',
                gap: 10,
                alignContent: 'center',
                alignItems: 'center',
                height: 50,
                width: label ? 'auto' : 50,
                borderRadius: 10,
                overflow: 'hidden',
                paddingVertical: 5,
                paddingHorizontal: label ? 10 : 0,
                backgroundColor: transparent
                    ? 'transparent'
                    : disabled
                        ? '#aaa'
                        : color,
                        // :'rgba(255, 99, 71, 0.3)'// tomato
            },
            props.style,
        ]}
    >
        <Icon
            name={name}
            size={size}
            color={transparent
                ? disabled
                    ? '#fff'
                    : color
                : '#fff'
            }
            style={{
                paddingLeft: 1,
                marginHorizontal: 'auto',
            }}
        />

        {label && (
            <ThemedText
                bold
                color={transparent
                    ? disabled
                        ? '#fff'
                        : color
                    : '#fff'
                }
            >
                {label}
            </ThemedText>
        )}
    </Pressable>
)

export default IconButtonLarge