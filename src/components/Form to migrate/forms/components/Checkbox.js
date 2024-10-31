import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { ThemedText } from'@components'
import { useApp } from'@app'
import Icon from 'react-native-vector-icons/Ionicons'

const Checkbox = ({ label, onChange, value = false }) => {

    const { theme } = useApp()

    const [checked, setChecked] = useState(value)
    
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
                name={checked ? 'radio-button-on' : 'radio-button-off'}
                size={22}
                color={checked ? 'tomato' : theme?.colors.textDefault}
            />

            <ThemedText>{label}</ThemedText>
        </Pressable>
    )
}

export default Checkbox