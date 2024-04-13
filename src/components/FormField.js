import React from 'react'
import {
    Text,
    TextInput,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import classes from '@styles/classes'
import {
    useApp,
} from '@context'

export default ({ dirty, error, label, value, ...props }) => {

    const { theme } = useApp()

    return (
        <View>
            <ThemedText
                style={[
                    classes.formInputLabel,
                    { color: theme?.colors.inputLabel },
                ]}
            >
                {label}
            </ThemedText>

            <View
                style={[
                    classes.formInputContainer,
                    { borderBottomColor: dirty ? error ? '#f00' : '#1f1' : '#00f' },
                ]}
            >
                <View
                    style={{ background: theme?.colors.inputBackground }}
                >
                    <TextInput
                        value={value}
                        multiline={false}
                        autoCorrect={false}
                        spellCheck={false}
                        style={[
                            classes.formInput,
                            {
                                color: theme?.colors.inputText,
                                placeholderTextColor: theme?.colors.inputPlaceholder,
                                background: 'transparent',
                                lineHeight: 40,
                                height: 40,
                                flexWrap: 'nowrap',
                                maxWidth: 300,
                            },
                        ]}
                        {...props}
                    />
                </View>

            </View>

            <Text
                style={{
                    color: dirty && error ? '#f00' : '#00f',
                    marginTop: 2,
                    fontSize: 12,
                    lineHeight: 16,
                    textAlign: 'right',
                }}
            >
                {dirty && error ? error : `*required`}
            </Text>

        </View>
    )
}