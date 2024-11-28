import React from 'react'
import { View } from 'react-native'
import { IconButtonLarge, SimpleButton } from '@components'
import { useUser } from '@user'
import { useModal } from '@modal'
import { useSocket } from '@socket'

const FOOTER_HEIGHT = 60

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
                height: FOOTER_HEIGHT,
            }}
        >
            <SimpleButton
                label={`${connections.length || 'No'} viewer${connections.length !== 1 ? `s` : ''}`}
                onPress={() => {
                    console.log('setting SOCKETS modal')
                    setModal('SOCKETS')
                }}
                // style={{ flexGrow: 0 }}
            />

            {user && (
                <View style={{ flexGrow: 0 }}>
                    <IconButtonLarge
                        name='settings-sharp'
                        size={24}
                        onPress={() => setModal('SETTINGS')}
                    />
                </View>
            )}
        </View>
    )
}