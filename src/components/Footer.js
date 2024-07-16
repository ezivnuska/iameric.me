import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
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
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 35,
            }}
        >
            <Pressable
                onPress={() => setModal('SOCKETS')}
                style={{ flexGrow: 0 }}
            >
                <ThemedText size={14} color='#aaa'>
                    {`${connections.length || 'No'} viewer${connections.length !== 1 ? `s` : ''}`}
                </ThemedText>
            </Pressable>

            <View style={{ flexGrow: 0 }}>
                <IconButton
                    name='cog'
                    onPress={() => setModal('SETTINGS')}
                />
            </View>
        </View>
    )
}