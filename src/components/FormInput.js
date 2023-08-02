import React, { useState } from 'react'
import {
    StyleSheet,
	Text,
	TextInput,
    View,
} from 'react-native'
import defaultStyles from '../styles'

const FormInput = ({ label, onChange, ...props }) => {
    
    const [inputValue, setInputValue] = useState('')

    const onChangeText = value => {
        setInputValue(value)
        onChange(value)
    }

    return (
        <View style={styles.container}>
            
            {(label && label.length) ? <Text style={defaultStyles.label}>{label}</Text> : null}
            
            <View style={defaultStyles.inputContainer}>
                
                <TextInput
                    style={[defaultStyles.input]}
                    // onBlur={onBlur}
                    onChangeText={onChangeText}
                    value={inputValue}
                    {...props}
                />

            </View>
        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
    },
})