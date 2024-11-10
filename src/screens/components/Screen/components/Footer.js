import React from 'react'
import {
    Pressable,
    View,
} from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import { useUser } from '@user'
import { useModal } from '@modal/ModalContext'
import { useSocket } from '@socket'
import { navigate } from '@utils/navigation'

export default () => {

    const { user } = useUser()
    const { setModal } = useModal()
    const { connections } = useSocket()

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                height: 40,
            }}
        >
            <Pressable
                onPress={() => {
                    console.log('setting SOCKETS modal')
                    setModal('SOCKETS')
                }}
                style={{ flexGrow: 0 }}
            >
                <ThemedText color='#777'>
                    {`${connections.length || 'No'} viewer${connections.length !== 1 ? `s` : ''}`}
                </ThemedText>
            </Pressable>

            {/* <Pressable
                onPress={() => navigate('Forum')}
                style={{ flexGrow: 0 }}
            >
                <ThemedText color='#777'>
                    Feedback
                </ThemedText>
            </Pressable> */}

            {user && (
                <View style={{ flexGrow: 0 }}>
                    <IconButton
                        name='settings-sharp'
                        size={22}
                        color='#777'
                        onPress={() => setModal('SETTINGS')}
                    />
                </View>
            )}
        </View>
    )
}