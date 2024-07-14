import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

export default ({ title }) => (
    <View style={{ marginBottom: 10 }}>
        
        <ThemedText
            bold
            size={18}
            color='tomato'
        >
            {title}
        </ThemedText>
        
    </View>
)