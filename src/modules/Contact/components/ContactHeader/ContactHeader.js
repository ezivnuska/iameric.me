import React from 'react'
import { View } from 'react-native'
import { Heading } from '@components'

export default ({ title }) => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        }}
    >
        <Heading title={title} />

    </View>
)