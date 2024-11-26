import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { DefaultText } from'@components'
import Icon from 'react-native-vector-icons/Ionicons'

const Checkbox = ({ label, onChange, value = false, disabled = false }) => {

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
                size={32}
                color={disabled ? '#ccc' : 'tomato'}
            />

            <DefaultText
                size={24}
                color={disabled ? '#ccc' : 'tomato'}
            >
                {label}
            </DefaultText>
        </Pressable>
    )
}

export default Checkbox