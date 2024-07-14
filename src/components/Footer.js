import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { useSocket } from '@socket'

export default () => {
    const { connections } = useSocket()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 35,
            }}
        >
            <ThemedText size={14} color='#aaa'>
                {`${connections.length || 'No'} viewer${connections.length !== 1 ? `s` : ''}`}
            </ThemedText>
        </View>
    )
}