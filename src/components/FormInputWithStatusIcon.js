import React, { useState } from 'react'
import {
    StyleSheet,
	Text,
	TextInput,
    View,
} from 'react-native'
import { FormInputStatusIcon } from '.'
import defaultStyles from '../styles'

const FormInputWithStatusIcon = ({ isLoading, isValid, label, onChange, ...props }) => {
    
    const [inputValue, setInputValue] = useState('')

    const onChangeText = value => {
        setInputValue(value)
        onChange(value)
    }

    return (
        <View style={styles.container}>
            <Text style={defaultStyles.label}>{label}</Text>
            <View style={defaultStyles.inputContainer}>
                <TextInput
                    style={[defaultStyles.input]}
                    // onBlur={onBlur}
                    onChangeText={onChangeText}
                    value={inputValue}
                    {...props}
                />
                <View style={defaultStyles.inputStatusIconContainer}>
                    <FormInputStatusIcon
                        isLoading={isLoading}
                        isValid={isValid}
                    />
                </View>
            </View>
        </View>
    )
}

export default FormInputWithStatusIcon

const styles = StyleSheet.create({
    container: {

    },
    dirty: {
        borderWidth: 1,
        borderColor: 'red',
    }
})