import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useTheme } from '@context'

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

    const { theme } = useTheme()

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
                <Text variant='titleLarge'>
                    {label}
                </Text>
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
            
            {dirty && error ? (
                <Text variant='bodySmall'>
                    * required
                </Text>
            ) : null}

        </View>
    )
}

export default FormField