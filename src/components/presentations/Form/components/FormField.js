import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { TextCopy } from '@components'
import { useApp } from '@context'

const FormField = ({
    name,
    dirty,
    error,
    value,
    onChange,
    multiline,
    focused,
    label = null,
    required = true,
    ...props
}) => {

    const { theme } = useApp()

    useState(() => {
        if (dirty && error) console.log('error:', error)
    }, [error])

    return (
        <View
            style={{
                flex: 1,
                gap: 5,
                // marginBottom: 10,
            }}
        >
            {label && (
                <TextCopy
                    bold
                    size={18}
                    style={{
                        flexGrow: 0,
                        color: theme?.colors.inputLabel,
                    }}
                >
                    {label}
                </TextCopy>
            )}

            <View
                style={{
                    flexGrow: 1,
                    gap: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        background: 'transparent',//focused ? theme?.colors.inputBackgroundFocused : theme?.colors.inputBackground,
                        borderBottomWidth: 1,
                        borderBottomColor: error ? '#f00' : dirty ? '#1f1' : '#fff'
                    }}
                >
                    <TextInput
                        {...props}
                        value={value || ''}
                        autoCorrect={false}
                        placeholderTextColor={focused ? theme?.colors.inputPlaceholderTextFocused : theme?.colors.inputPlaceholderText}
                        spellCheck={false}
                        multiline={multiline}
                        onChangeText={onChange}
                        rows={multiline ? 4 : 1}
                        style={{
                            paddingVertical: multiline ? 15 : 0,
                            color: focused ? theme?.colors.inputTextFocused : theme?.colors.inputText,
                            background: 'transparent',
                            fontSize: 16,
                            lineHeight: 21,// multiline ? 25 : 40,
                            maxWidth: '100%',
                            height: multiline ? '100%' : 40,
                            flexWrap: 'wrap',
                            textAlignVertical: 'top',
                            backgroundColor: 'none',
                            outlineWidth: 0,
                            outlineColor: 'transparent',
                        }}
                    />
                </View>

            </View>
            
            <Text
                style={{
                    color: error ? '#f00' : dirty ? '#00f' : '#ccc',
                    marginTop: 2,
                    fontSize: 14,
                    lineHeight: 18,
                    textAlign: 'right',
                }}
            >
                {required ? error && dirty ? error : `*required` : ' '}
            </Text>

        </View>
    )
}

export default FormField