
import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'

export default ({ disabled, label, onPress, transparent = false, color = '#fff', ...props }) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: transparent ? 'transparent' : disabled ? '#ccc' : 'tomato',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                ...props.style,
            }}
        >
            <Text
                style={{
                    flex: 1,
                    color: transparent ? color ? color : disabled : '#eee',
                    fontSize: 16,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                    fontWeight: 700,
                    textAlign: 'center',
                }}
            >
                {label}
            </Text>
        </Pressable>
    )
}