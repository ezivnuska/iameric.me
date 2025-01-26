import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { Button, Text } from'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

const Checkbox = ({ label, onChange, value = false, disabled = false }) => {

    const [checked, setChecked] = useState(value)
    
    useEffect(() => onChange(checked), [checked])

    const onPress = () => setChecked(!checked)
    
    return (
        <Button
            icon={`${checked ? 'radio-button-on' : 'radio-button-off'}`}
            onPress={onPress}
        >
            {label}
        </Button>
    )
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

            <Text
                variant='labelLarge'
                textColor={checked ? '#ccc' : 'tomato'}
            >
                {label}
            </Text>
        </Pressable>
    )
}

export default Checkbox