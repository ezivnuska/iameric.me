import React from 'react'
import { Text } from 'react-native'
import { useApp } from '@app'

const DefaultText = ({ children, bold = false, color = null, size = 16, align = 'left', ...props }) => {
    
    const { theme } = useApp()
    
    return (
        <Text
            style={[
                {
                    // width: '100%',
                    fontSize: size,
                    fontWeight: bold ? 700 : 400,
                    color: color || theme?.colors.textDefault,
                    lineHeight: size + 10,
                    textAlign: align,
                },
                props.style,
            ]}
        >
            {children}
        </Text>
    )
}

export default DefaultText