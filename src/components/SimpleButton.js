
import React from 'react'
import {
    Pressable,
    Text,
} from 'react-native'

const SimpleButton = ({ disabled, label, onPress, transparent = false, color = null, ...props }) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={{
                height: 50,
                backgroundColor: transparent
                    ? 'transparent'
                    : disabled
                        ? '#ccc'
                        : color
                            ? color
                            : 'tomato',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                ...props.style,
            }}
        >
            <Text
                style={{
                    flex: 1,
                    color: transparent
                        ? color
                        : '#fff',
                    fontSize: 18,
                    lineHeight: 50,
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

export default SimpleButton