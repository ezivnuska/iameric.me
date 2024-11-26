import React, { useState } from 'react'
import {
    Text,
    TextInput,
    View,
} from 'react-native'
import { DefaultText } from '@components'
import { useApp } from '@app'

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
        if (error) console.log('error:', error)
    }, [error])

    return (
        <View
            style={{
                gap: 5,
                marginBottom: 10,
            }}
        >
            {label && (
                <DefaultText
                    bold
                    size={18}
                    style={{
                        flexGrow: 0,
                        color: theme?.colors.inputLabel,
                    }}
                >
                    {label}
                </DefaultText>
            )}

            <View
                style={{
                    flexGrow: 1,
                    gap: 10,
                }}
            >
                <View
                    style={{
                        background: focused ? theme?.colors.inputBackgroundFocused : theme?.colors.inputBackground,
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
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            color: focused ? theme?.colors.inputTextFocused : theme?.colors.inputText,
                            background: 'transparent',
                            fontSize: 18,
                            lineHeight: multiline ? 25 : 40,
                            maxWidth: '100%',
                            height: multiline ? 100 : 40,
                            flexWrap: 'wrap',
                            textAlignVertical: 'top',
                            backgroundColor: '#f7f7f7',
                            // borderTopLeftRadius: 10,
                            // borderTopRightRadius: 10,
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