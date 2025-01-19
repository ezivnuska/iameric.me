import React from 'react'
import { Text } from 'react-native'

const TextHeading = ({
    color = '#000',
    size = 24,
    align = 'left',
    ...props
}) => (
    <Text
        style={{
            flex: 1,
            flexWrap: 'wrap',
            flexGrow: 0,
            width: '100%',
            fontSize: size,
            fontWeight: 700,
            color: color,
            lineHeight: size + 10,
            textAlign: align,
            marginBottom: 15,
            // paddingHorizontal: 10,
        }}
    >
        {props.children || 'Heading'}
    </Text>
)

export default TextHeading