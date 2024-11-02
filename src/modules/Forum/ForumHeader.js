import React from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'

const ForumHeader = ({ setModal }) => (
    <View
        style={{
            flexGrow: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
        }}
    >
        <ThemedText bold size={20}>
            Forum
        </ThemedText>

        <IconButton
            name='add-circle-outline'
            onPress={() => setModal('FEEDBACK')}
            size={22}
        />

    </View>
)

export default ForumHeader