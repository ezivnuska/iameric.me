import React, { useMemo } from 'react'
import { View } from 'react-native'
import { IconButtonLarge, SimpleButton } from '..'
import { useModal, useSocket, useUser } from '@context'
import navigationRef from '@utils/navigation'

const FOOTER_HEIGHT = 50

const Footer = ({ route }) => {

    const { user } = useUser()
    const { setModal } = useModal()
    const { connections } = useSocket()

    const disableBug = useMemo(() => route.name === 'Bugs', [route])

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
                onPress={() => setModal('SOCKETS')}
                color='tomato'
                transparent
            />

            {user && (
                <View
                    style={{
                        flexGrow: 0,
                        flexDirection: 'row',
                        gap: 10,
                    }}
                >
                    <IconButtonLarge
                        name='bug'
                        size={24}
                        onPress={() => navigationRef.navigate('Bugs')}
                        disabled={disableBug}
                        transparent
                    />

                    <IconButtonLarge
                        name='settings-sharp'
                        size={24}
                        onPress={() => setModal('SETTINGS')}
                        transparent
                    />
                </View>
            )}
        </View>
    )
}

export default Footer