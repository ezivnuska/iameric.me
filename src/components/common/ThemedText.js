import React from 'react'
import {
    Text,
} from 'react-native'
import { useApp } from '@app'

export default ({ children, bold = false, color = null, size = 16, ...props }) => {
    
    const { dims, theme } = useApp()
    
    return (
        <Text
            style={[
                {
                    fontSize: size,
                    fontWeight: bold ? 700 : 400,
                    color: color || theme?.colors.textDefault,
                    lineHeight: size + 5,
                    // width: '100%',
                    // maxWidth: dims.width,
                },
                props.style,
            ]}
        >
            {children}
        </Text>
    )
}