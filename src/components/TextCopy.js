import React from 'react'
import { Text, View } from 'react-native'
import { useApp } from '@context'

const TextCopy = ({
    bold = false,
    color = null,
    size = 16,
    align = 'left',
    ...props
}) => {
    
    const { theme } = useApp()
    
    return (
        <Text
            style={[
                {
                    flexShrink: 1,
                    fontSize: size,
                    fontWeight: bold ? 700 : 400,
                    color: color || theme.colors.textDefault,
                    lineHeight: size + 5,
                    textAlign: align,
                },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    )
}

export default TextCopy