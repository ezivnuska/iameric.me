import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'

const LoadingView = ({ loading = null }) => (
    <View
        style={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
        }}
    >
        <ThemedText align='center'>
            {loading || 'Loading...'}
        </ThemedText>

    </View>
)

export default LoadingView