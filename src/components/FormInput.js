import React, { useState } from 'react'
import {
	Text,
	TextInput,
    View,
} from 'react-native'
import defaultStyles from '../styles/main'
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
            style={[defaultStyles.inputContainer, styles]}
        >
            
            {(label && label.length) ? (
                <Text
                    style={[
                        defaultStyles.darkFormLabel,
                        { color: theme?.colors.textDefault }
                    ]}
                >
                    {label}
                </Text>
            ) : null}
                
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