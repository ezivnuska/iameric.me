import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

const Tile = ({ label, size, ...props }) => {

    // useEffect(() => console.log('rendering tile', style), [style])
    // console.log('dragging/direction', dragging, direction)
    return (
        <View
            style={[
                {
                    flex: 1,
                    width: '100%',
                    height: size,
                    width: size,
                    overflow: 'hidden',
                    borderRadius: 8,
                },
                props.style,
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