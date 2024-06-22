import React from 'react'
import {
    Text,
} from 'react-native'
import { classes } from '@styles'
import { useApp } from '@context'

export default ({ children, align = 'left', bold = false, size = null, ...props }) => {
    
    const { dims, theme } = useApp()
    
    return (
        <Text
            style={[
                classes.textDefault,
                {
                    color: theme?.colors.textDefault,
                    fontWeight: bold ? 700 : 400,
                    textAlign: align,
                    fontSize: size || classes.textDefault.fontSize,
                },
                props.style,
            ]}
        >
            {children}
        </Text>
    )
}