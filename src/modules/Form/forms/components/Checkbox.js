import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { ThemedText } from'@components'
import { useApp } from'@app'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ label, onChange }) => {

    const { theme } = useApp()

    const [checked, setChecked] = useState(false)
    
    useEffect(() => onChange(checked), [checked])

    const onPress = () => setChecked(!checked)
    
    return (
        <Pressable
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <Icon
                name={checked ? 'ellipse' : 'ellipse-outline'}
                size={22}
                color={theme?.colors.textDefault}
            />

            <ThemedText>{label}</ThemedText>
        </Pressable>
    )
}