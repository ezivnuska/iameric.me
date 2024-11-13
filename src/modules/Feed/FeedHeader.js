import React from 'react'
import { View } from 'react-native'
import {
    IconButtonLarge,
    ThemedText,
} from '@components'

const FeedHeader = ({ setModal }) => (
    <View
        style={{
            flexGrow: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
        }}
    >
        <ThemedText bold size={40}>
            Feed
        </ThemedText>

        <IconButtonLarge
            name='add'
            onPress={setModal}
            size={36}
        />

    </View>
)

export default FeedHeader