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
    useForm,
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
                    { borderBottomColor: props.autoFocus ? '#0f0' : error && !dirty ? '#ccc' : error && dirty ? '#f00' : '#00f' },
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
                    color: error && dirty ? '#f00' : !dirty ? '#00f' : '#ccc',
                    marginTop: 2,
                    fontSize: 12,
                    lineHeight: 16,
                    textAlign: 'right',
                }}
            >
                {error && dirty ? error : `*required`}
            </Text>

        </View>
    )
}