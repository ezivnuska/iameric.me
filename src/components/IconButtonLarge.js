
import React from 'react'
import { Pressable } from 'react-native'
import { ThemedText } from '@components'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButtonLarge = ({
    disabled,
    onPress,
    name,
    color = null,
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
                ? '#000'
                : color
                ? color
                : 'tomato',
                // :'rgba(255, 99, 71, 0.3)'// tomato
            },
            props.style,
        ]}
    >
        <Icon
            name={name}
            size={size}
            color={(color && transparent) ? color : '#fff'}
            style={{
                paddingLeft: 1,
                marginHorizontal: 'auto',
            }}
        />

        {label && (
            <ThemedText color='#fff' bold>
                {label}
            </ThemedText>
        )}
    </Pressable>
)

export default IconButtonLarge