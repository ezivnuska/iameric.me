import React from 'react'
import {
    Text,
} from 'react-native'
import classes from '../styles/classes'
import { useApp } from '@context'

export default ({ children, align = 'left', bold = false, ...props }) => {
    
    const { theme } = useApp()
    
    return (
        <Text
            style={[
                classes.textDefault,
                {
                    color: theme?.colors.textDefault,
                    fontWeight: bold ? 700 : 400,
                    textAlign: align,
                },
                props.style,
            ]}
        >
            {children}
        </Text>
    )
}