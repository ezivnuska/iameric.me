import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

const SquareWithLabel = ({ label, size }) => {
    return (
        <View
            style={{ flex: 1, width: '100%' }}
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

export default SquareWithLabel