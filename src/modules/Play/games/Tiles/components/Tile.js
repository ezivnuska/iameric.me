import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { getModifiedColor } from '@utils'

const Tile = ({ label, size, dragging, direction, style, ...props }) => {

    const colorBase = '#990000'
    const colors = {
        dragged: getModifiedColor(colorBase, 25),
        enabled: getModifiedColor(colorBase, 50),
    }

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
					backgroundColor: !direction
                        ? colors.enabled
                        : dragging
                            ? colors.dragged
                            : colorBase,
                },
                style,
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