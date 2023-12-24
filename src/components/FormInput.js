import React, { useState } from 'react'
import {
    StyleSheet,
	Text,
	TextInput,
    View,
} from 'react-native'
import defaultStyles from '../styles/main'

const FormInput = ({ label, onChange, invalid = false, ...props }) => {
    
    const [inputValue, setInputValue] = useState('')
    const [dirty, setDirty] = useState(false)

    const onChangeText = value => {
        setInputValue(value)
        setDirty(true)
        onChange(value)
    }

    const styles = {
        borderBottomColor: !dirty ? '#fff' : invalid ? '#f00' : '#1f1',
    }

    return (
        <View
            style={[defaultStyles.inputContainer, styles]}
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