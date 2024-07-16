import React from 'react'
import { View } from 'react-native'

export default ({ contact }) => (
    <View
        style={{
            flexGrow: 1,
            justifyContent: 'space-between',
            gap: 20,
        }}
    >
        <View style={{ flexGrow: 1 }}>
            {contact.username}
        </View>

    </View>
)