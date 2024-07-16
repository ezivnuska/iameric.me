
import React from 'react'
import { Pressable } from 'react-native'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ disabled, name, onPress, size = 18, ...props }) => {

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
                    height: 24,
                },
                props.style,
            ]}
        >
            <Icon
                name={name}
                size={size}
                color={disabled ? 'rgba(200, 200, 200, 0.5)' : theme?.colors.textDefault}
            />
        </Pressable>
    )
}