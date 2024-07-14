
import React from 'react'
import { Pressable } from 'react-native'
import { useApp } from '@app'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ disabled, name, onPress }) => {

    const { theme } = useApp()
    
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={{ flexDirection: 'row', alignItems: 'center', height: 24 }}
        >
            <Icon
                name={name}
                size={18}
                color={disabled ? 'rgba(200, 200, 200, 0.5)' : theme?.colors.textDefault}
            />
        </Pressable>
    )
}