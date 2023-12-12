import React, { useState } from 'react'
import {
    StyleSheet,
	Text,
	TextInput,
    View,
} from 'react-native'
import defaultStyles from '../styles/main'

const FormInput = ({ label, onChange, ...props }) => {
    
    const [inputValue, setInputValue] = useState('')

    const onChangeText = value => {
        setInputValue(value)
        onChange(value)
    }

    return (
        <View
            style={defaultStyles.inputContainer}
        >
            
            {(label && label.length) ? <Text style={defaultStyles.darkFormLabel}>{label}</Text> : null}
                
            <TextInput
                style={[defaultStyles.input, { flexShrink: 0 }]}
                // onBlur={onBlur}
                onChangeText={onChangeText}
                value={inputValue}
                {...props}
            />

        </View>
    )
}

export default FormInput