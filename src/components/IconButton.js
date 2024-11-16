
import React from 'react'
import { Pressable } from 'react-native'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButton = ({ disabled, name, onPress, color = null, size = 18, ...props }) => {

    const { theme } = useApp()

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={[
                {
                    flexGrow: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: size + 4,
                    opacity: disabled ? 0.3 : 1,
                },
                props.style,
            ]}
        >
            <Icon
                name={name}
                size={size}
                color={color || theme?.colors.textDefault}
            />
        </Pressable>
    )
}

export default IconButton