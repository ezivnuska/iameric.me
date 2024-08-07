import React from 'react'
import { Text } from 'react-native'
import { useApp } from '@app'

export default ({ children, bold = false, color = null, size = 16, ...props }) => {
    
    const { theme } = useApp()
    
    return (
        <Text
            style={{
                fontSize: size,
                fontWeight: bold ? 700 : 400,
                color: color || theme?.colors.textDefault,
                lineHeight: size + 10,
                ...props.style,
            }}
        >
            {children}
        </Text>
    )
}