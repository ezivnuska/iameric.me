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
                paddingHorizontal: 20,
                height: 40,
            }}
        >
            <Pressable
                onPress={() => setModal('SOCKETS')}
                style={{ flexGrow: 0 }}
            >
                <ThemedText color='#777'>
                    {`${connections.length || 'No'} viewer${connections.length !== 1 ? `s` : ''}`}
                </ThemedText>
            </Pressable>

            <View style={{ flexGrow: 0 }}>
                <IconButton
                    name='settings-sharp'
                    size={22}
                    color='#777'
                    onPress={() => setModal('SETTINGS')}
                />
            </View>
        </View>
    )
}