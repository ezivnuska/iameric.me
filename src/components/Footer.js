import React from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { useModal } from '@modal'
import { useSocket } from '@socket'

export default () => {

    const { setModal } = useModal()
    const { connections } = useSocket()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 35,
            }}
        >
            <View style={{ flexGrow: 1 }}>
                <ThemedText size={14} color='#aaa'>
                    {`${connections.length || 'No'} viewer${connections.length !== 1 ? `s` : ''}`}
                </ThemedText>
            </View>

            <View style={{ flexGrow: 0 }}>
                <IconButton
                    name='cog'
                    onPress={() => setModal('SETTINGS')}
                />
            </View>
        </View>
    )
}