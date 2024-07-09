import React from 'react'
import {
    Text,
    TextInput,
    View,
} from 'react-native'
import { ThemedText } from '@components'
import { useApp } from '@app'

export default ({ dirty, error, value, focused, label = null, required = false, ...props }) => {

    const { theme } = useApp()

    return (
        <View
            style={{
                gap: 5,
                marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexGrow: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}
            >
            
                <View style={{ flexGrow: 1 }}>

                    {label && (
                        <ThemedText
                            style={{
                                flexGrow: 0,
                                color: theme?.colors.inputLabel,
                            }}
                        >
                            {label}
                        </ThemedText>
                    )}

                </View>

                <View style={{ flexGrow: 0 }}>
                    <Text
                        style={{
                            color: error ? '#f00' : dirty ? '#00f' : '#ccc',
                            marginTop: 2,
                            fontSize: 12,
                            lineHeight: 16,
                            textAlign: 'right',
                        }}
                    >
                        {required ? error && dirty ? error : `*required` : ' '}
                    </Text>
                </View>

            </View>

            <View
                style={{
                    flexGrow: 1,
                    gap: 10,
                }}
            >
                <View
                    style={{ borderBottomColor: dirty ? error ? '#f00' : '#1f1' : '#00f' }}
                >
                    <View
                        style={{ background: focused ? theme?.colors.inputBackgroundFocused : theme?.colors.inputBackground }}
                    >
                        <TextInput
                            value={value || ''}
                            multiline={false}
                            autoCorrect={false}
                            placeholderTextColor={focused ? theme?.colors.inputPlaceholderTextFocused : theme?.colors.inputPlaceholderText}
                            spellCheck={false}
                            style={{
                                paddingHorizontal: 5,
                                color: focused ? theme?.colors.inputTextFocused : theme?.colors.inputText,
                                background: 'transparent',
                                fontSize: 18,
                                lineHeight: 40,
                                height: 40,
                                flexWrap: 'nowrap',
                                // maxWidth: 300,
                            }}
                            {...props}
                        />
                    </View>

                </View>

            </View>

        </View>
    )
}