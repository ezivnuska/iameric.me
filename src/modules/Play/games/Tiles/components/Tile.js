import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

const Tile = ({ label, size, dragging, draggable, style, ...props }) => {
    return (
        <View
            {...props}
            style={[
                {
                    flex: 1,
                    width: '100%',
                    height: size,
                    width: size,
                    overflow: 'hidden',
                    borderRadius: 8,
					backgroundColor: draggable ? dragging ? 'purple' : 'green' : '#b58df1',//getModifiedColor('#b58df1', 25),
                },
                (style || null),
            ]}
        >
            <ThemedText
                bold
                color='#FFE04B'
                align='center'
                size={48}
                style={{
                    flex: 1,
                    lineHeight: size,
                }}
            >
                {label}
            </ThemedText>

        </View>
    )
}

export default Tile