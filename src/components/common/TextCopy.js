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
        // <View style={{ flexShrink: 1, flexDirection: 'row' }}>

            <Text
                style={[
                    {
                        // flex: 1,
                        // flexWrap: 'wrap',
                        flexShrink: 1,
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
                {props.children}
            </Text>
        // </View>
    )
}

export default TextCopy