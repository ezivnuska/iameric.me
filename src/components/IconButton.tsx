
import React from 'react'
import { Pressable } from 'react-native'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButton = ({ disabled, name, onPress, color = null, size = 18, ...props }) => {

    const { theme } = useApp()
    
    const iconColor = color || theme?.colors.textDefault

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
                },
                props.style,
            ]}
        >
            <Icon
                name={name}
                size={size}
                color={disabled ? 'tomato' : iconColor}
            />
        </Pressable>
    )
}

export default IconButton