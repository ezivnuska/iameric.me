
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
                // justifyContent: 'flex-start',
                gap: 10,
                alignContent: 'center',
                alignItems: 'center',
                height: 40,
                width: label ? 'auto' : 40,
                borderRadius: 10,
                overflow: 'hidden',
                paddingVertical: 5,
                paddingHorizontal: label ? transparent ? 0 : 10 : 0,
                backgroundColor: transparent
                    ? 'transparent'
                    : color,
                        // :'rgba(255, 99, 71, 0.3)'// tomato
                // opacity: disabled ? 0.5 : 1,
            },
            props.style,
        ]}
    >
        <Icon
            name={name}
            size={size}
            color={transparent
                ? disabled
                    ? '#000'
                    : color
                : '#fff'
            }
            style={{
                flexGrow: 0,
                paddingLeft: 1,
                marginHorizontal: 'auto',
            }}
        />

        {label && (
            <ThemedText
                bold
                color={transparent
                    ? disabled
                        ? '#000'
                        : color
                    : '#fff'
                }
                style={{
                    flexGrow: 1,
                }}
            >
                {label}
            </ThemedText>
        )}
    </Pressable>
)

export default IconButtonLarge