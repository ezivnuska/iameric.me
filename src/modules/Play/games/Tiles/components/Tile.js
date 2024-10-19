import React from 'react'
import { View } from 'react-native'
import { SquareWithLabel } from '.'

const Tile = ({ label, size, style, ...props }) => {
    return (
        <View
            {...props}
            style={[
                {
                    position: 'absolute',
                    height: size,
                    width: size,
                    overflow: 'hidden',
                    borderRadius: 8,
                },
                (style || null),
            ]}
        >
            <SquareWithLabel label={label} size={size} />
        </View>
    )
}

export default Tile