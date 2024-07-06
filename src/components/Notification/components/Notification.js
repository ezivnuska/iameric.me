import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'

export default ({ text, onPress }) => (
    <Pressable
        onPress={onPress}
    >
        <View
            style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                background: 'rgba(0, 200, 0, 0.8)',

            }}
        >
            <ThemedText bold color='#000'>
                {text}
            </ThemedText>
        </View>
    </Pressable>
)