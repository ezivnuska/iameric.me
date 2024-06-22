import React, { useState } from 'react'
import { View } from 'react-native'

const HoverableView = ({ children, onHover, style, ...props }) => {
    const [ styles, setStyles ] = useState(style)
    return (
        <View
            style={styles}
            onMouseEnter={() => setStyles(onHover)}
            onMouseLeave={() => setStyles(style)}
            {...props}
        >
            {children}
        </View>
    )
}

export default HoverableView