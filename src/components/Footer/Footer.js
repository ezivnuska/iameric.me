import React, { useMemo } from 'react'
import { View } from 'react-native'
import { IconButtonLarge, TextCopy, TextPressable } from '@components'
import { useModal, useSocket, useUser } from '@context'
import navigationRef from '@utils/navigation'

const Footer = ({ landscape, route }) => {

    const { user } = useUser()
    const { setModal } = useModal()
    const { connections, connectionsLoading } = useSocket()

    const disableBug = useMemo(() => route.name === 'Bugs', [route])

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                minWidth: 300,
                maxWidth: landscape ? '100%' : 400,
                marginHorizontal: landscape ? 0 : 'auto',
                paddingLeft: landscape ? 5 : 0,
            }}
        >
            <View
                style={{ paddingHorizontal: 10 }}
            >
                {connectionsLoading ? (
                    <TextCopy color='#ccc'>
                        Connectiong to socket...
                    </TextCopy>
                ) : (
                    <TextPressable
                        onPress={() => setModal('SOCKETS')}
                    >
                        {`${connections.length} user${connections.length !== 1 ? `s` : ''} connected`}
                    </TextPressable>
                )}
            </View>

            {user && (
                <View
                    style={{
                        flexGrow: 0,
                        flexDirection: 'row',
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