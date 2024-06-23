import React from 'react'
import {
    Text,
    TextInput,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import {
    useApp,
} from '@app'

export default ({ dirty, error, value, focused, label = null, required = false, ...props }) => {

    const { dark, theme } = useApp()

    return (
        <View
            style={{
                gap: 10,
            }}
        >
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
                        style={{ background: focused ? dark ? '#111' : '#eee' : theme?.colors.inputBackground }}
                    >
                        <TextInput
                            value={value}
                            multiline={false}
                            autoCorrect={false}
                            spellCheck={false}
                            style={{
                                color: theme?.colors.inputText,
                                placeholderTextColor: theme?.colors.inputPlaceholder,
                                background: 'transparent',
                                lineHeight: 40,
                                height: 40,
                                flexWrap: 'nowrap',
                                // maxWidth: 300,
                            }}
                            {...props}
                        />
                    </View>

                </View>

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
    )
}