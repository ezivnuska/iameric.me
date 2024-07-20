import React from 'react'
import { View } from 'react-native'
// import { ContactNav } from './components'
import { Heading } from '@components'

export default ({ title, ...props }) => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            // paddingBottom: 10,
        }}
    >
        <Heading title={title} />

        {/* <ContactNav {...props} /> */}

    </View>
)