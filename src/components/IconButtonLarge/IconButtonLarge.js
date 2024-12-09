
import React from 'react'
import { Pressable } from 'react-native'
import { DefaultText } from '@components'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButtonLarge = ({
    name,
    onPress,
    color = 'tomato',
    disabled = false,
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
                height: 40,
                width: label ? 'auto' : 40,
                borderRadius: 10,
                overflow: 'hidden',
                paddingVertical: 5,
                paddingHorizontal: label ? transparent ? 0 : 10 : 0,
                backgroundColor: transparent ? 'transparent' : color,
            },
            props.style,
        ]}
    >
        <Icon
            name={name}
            size={size}
            color={!transparent
                ? '#fff'
                : disabled
                    ? 'rgba(0, 0, 0, 0.5)'
                    : color
            }
            style={{
                flexGrow: 0,
                paddingLeft: 1,
                marginHorizontal: label ? 0 : 'auto',
            }}
        />

        {label && (
            <DefaultText
                bold
                color={transparent
                    ? disabled
                        ? 'rgba(0, 0, 0, 0.5)'
                        : color
                    : '#fff'
                }
                style={{
                    flexGrow: 1,
                }}
            >
                {label}
            </DefaultText>
        )}
    </Pressable>
)

export default IconButtonLarge