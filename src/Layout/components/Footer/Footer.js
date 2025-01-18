import React, { useMemo } from 'react'
import { View } from 'react-native'
import { IconButtonLarge, TextCopy, TextPressable } from '@components'
import { useModal, useSocket, useUser } from '@context'
import navigationRef from '@utils/navigation'

const Footer = ({ landscape, route }) => {

    const { user } = useUser()
    const { setModal } = useModal()
    const { connections, connectionsLoading } = useSocket()

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                minWidth: 300,
                maxWidth: landscape ? '90%' : 400,
                marginHorizontal: 'auto',
                paddingLeft: landscape ? 5 : 0,
                paddingVertical: landscape ? 5 : 0,
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
                        name='apps-sharp'
                        size={24}
                        onPress={() => navigationRef.navigate('Play')}
                        disabled={route.name === 'Play'}
                        transparent
                    />
                    <IconButtonLarge
                        name='bug'
                        size={24}
                        onPress={() => navigationRef.navigate('Bugs')}
                        disabled={route.name === 'Bugs'}
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