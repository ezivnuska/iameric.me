import React, { useState } from 'react'
import {
	TextInput,
    View,
} from 'react-native'
import {
    ThemedText,
} from '.'
import classes from '../styles/classes'
import { useApp } from '@context'

export default ({ label, onChange, value, style = null, multiline = false, invalid = false, ...props }) => {
    
    const { theme } = useApp()

    const [dirty, setDirty] = useState(false)
    const [inputHeight, setInputHeight] = useState()


    const onChangeText = value => {
        setInputValue(value)
        setDirty(true)
        onChange(value)
    }

    return (
        <View
            style={[
                classes.formInputContainer,
                {
                    borderBottomColor: !dirty ? '#fff' : invalid ? '#f00' : '#1f1',
                },
                style,
            ]}
        >
            {(label && label.length) ? (
                <ThemedText
                    style={[
                        classes.formInputLabel,
                        { color: theme?.colors.inputLabel }
                    ]}
                >
                    {label}
                </ThemedText>
            ) : null}
            
            <View
                style={{
                    backgroundColor: multiline ? theme?.colors.modalBackground : theme?.colors.inputBackground,
                    height: multiline ? Math.max(35, inputHeight) : 40,
                }}
            >
                <TextInput
                    style={[
                        multiline ? classes.formTextArea : classes.formInput,// { flexShrink: 0 },
                        {
                            flex: 1,
                            color: theme?.colors.inputText,
                            placeholderTextColor: theme?.colors.inputPlaceholder,
                            backgroundColor: 'transparent',
                            lineHeight: multiline ? 22 : 40,
                            height: multiline ? Math.max(35, inputHeight) : 40,
                            flexWrap: multiline ? 'wrap' : 'nowrap',
                            maxWidth: 300,
                        },
                        style,
                    ]}
                    multiline={multiline}
                    autoCorrect={false}
                    spellCheck={false}
                    // onBlur={onBlur}
                    onChangeText={onChangeText}
                    value={value}
                    onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
                    {...props}
                />
            </View>
            

        </View>
    )
}