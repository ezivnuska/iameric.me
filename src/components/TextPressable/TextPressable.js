import React from 'react'
import { Pressable, Text } from 'react-native'
import { useApp } from '@context'

const TextPressable = ({
    onPress,
    bold = false,
    color = null,
    size = 16,
    align = 'left',
    ...props
}) => {
    
    const { theme } = useApp()
    
    return (
        <Pressable
            style={{ flex: 1, width: '100%' }}
            onPress={onPress}
        >
            <Text
                style={[
                    {
                        flex: 1,
                        flexWrap: 'wrap',
                        width: '100%',
                        fontSize: size,
                        fontWeight: bold ? 700 : 400,
                        color: color || theme?.colors.textDefault,
                        lineHeight: size + 10,
                        textAlign: align,
                    },
                    props.style,
                ]}
            >
                {props.children}
            </Text>
        </Pressable>
    )
}

export default TextPressable