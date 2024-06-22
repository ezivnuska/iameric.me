
import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'

export default ({ label, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                marginVertical: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                background: 'tomato',
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                height: 32,
            }}
        >
            <Text
                style={{
                    flex: 1,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: 'center',
                }}
            >
                {label}
            </Text>
        </Pressable>
    )
}