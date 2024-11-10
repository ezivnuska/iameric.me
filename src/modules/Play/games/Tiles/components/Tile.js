import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

const Tile = ({ label, size, ...props }) => {

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