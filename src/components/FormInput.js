import React, { useState } from 'react'
import {
	TextInput,
    View,
} from 'react-native'
import {
    ThemedText,
} from '.'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

export default ({ label, onChange, invalid = false, ...props }) => {
    
    const theme = useTheme()

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
            style={[
                classes.formInputContainer,
                styles,
            ]}
        >
            
            {(label && label.length) ? (
                <ThemedText
                    style={[
                        classes.formInputLabel,
                        { color: theme?.colors.textDefault }
                    ]}
                >
                    {label}
                </ThemedText>
            ) : null}
                
            <TextInput
                style={[
                    classes.formInput,
                    props.multiline ? classes.formTextArea : null,// { flexShrink: 0 },
                    {
                        color: theme?.colors.inputText,
                        placeholderTextColor: theme?.colors.inputPlaceholder,
                        backgroundColor: theme?.colors.inputBackground,
                    },
                ]}
                // onBlur={onBlur}
                onChangeText={onChangeText}
                value={inputValue}
                {...props}
            />

        </View>
    )
}