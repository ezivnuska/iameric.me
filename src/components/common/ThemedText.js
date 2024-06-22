import React from 'react'
import {
    Text,
} from 'react-native'
import { useApp } from '@app'

export default ({ children, bold = false, ...props }) => {
    
    const { theme } = useApp()
    
    return (
        <Text
            style={[
                {
                    color: theme?.colors.textDefault,
                    fontWeight: bold ? 700 : 400,
                },
                props.style,
            ]}
        >
            {children}
        </Text>
    )
}