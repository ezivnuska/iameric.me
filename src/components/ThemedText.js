import React from 'react'
import {
    Text,
} from 'react-native'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

export default ({ children, bold = false, ...props }) => {
    
    const theme = useTheme()

    return (
        <Text
            style={[
                classes.textDefault,
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