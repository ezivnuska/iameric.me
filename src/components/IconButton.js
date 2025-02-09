
import React from 'react'
import { Pressable } from 'react-native'
// import { useTheme } from '@context'
import Icon from 'react-native-vector-icons/Ionicons'

const IconButton = ({ disabled, name, onPress, color = null, size = 18, padding = 0 }) => {

    // const { theme } = useTheme()

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={{
                flexGrow: 0,
                flexDirection: 'row',
                alignItems: 'center',
                height: size + 4,
                opacity: disabled ? 0.3 : 1,
                padding,
                outlineStyle: 'none',
            }}
        >
            <Icon
                name={name}
                size={size}
                color={color}
                // color={color || theme?.colors.textDefault}
            />
        </Pressable>
    )
}

export default IconButton