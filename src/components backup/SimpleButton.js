import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'

export default ({ disabled, label, onPress, ...props }) => (
    <Pressable
        onPress={onPress}
        disabled={disabled}
        style={[
            props.style,
            {
                paddingVertical: 5,
                paddingHorizontal: 8,
                borderRadius: 8,
                background: 'orange',
            }
        ]}
    >
        <Text
            style={{
                fontWeight: 500,
                textAlign: 'center',
                color: 'black',
            }}
        >
            {label}
        </Text>
    </Pressable>
)