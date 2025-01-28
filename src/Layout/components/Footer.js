import React from 'react'
import { View } from 'react-native'
import { Appbar, Badge, IconButton } from 'react-native-paper'
import { useModal, useSocket, useTheme } from '@context'
import navigationRef from '@utils/navigation'

const Connections = ({ connections, onPress }) => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
            margin: 0,
            padding: 0,
        }}
    >
        <View>
            <IconButton
                icon='lightning-bolt'
                onPress={onPress}
                style={{ margin: 0, padding: 0 }}
            />

            <Badge
                visible={connections.length > 0}
                style={{ position: 'absolute', top: 0, right: 0, margin: 0, padding: 0 }}
                size={16}
            >
                {connections.length}
            </Badge>
        </View>

    </View>
)

const Footer = ({ route }) => {

    const { dark, toggleTheme } = useTheme()
    const { setModal } = useModal()
    const { connections } = useSocket()

    
    return (
        <Appbar
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >

            <Appbar.Header
                // style={{ margin: 0, padding: 0, borderWidth: 1 }}
            >
                <Connections connections={connections} onPress={() => setModal('SOCKETS')} />
            </Appbar.Header>

            <Appbar.Header
                // style={{ margin: 0, padding: 0, borderWidth: 1 }}
            >
                
                <Appbar.Action
                    icon={dark ? 'white-balance-sunny' : 'weather-night'}
                    onPress={toggleTheme}
                    // style={{ margin: 0, padding: 0, borderWidth: 1 }}
                />
                
                <Appbar.Action
                    icon='grid'
                    onPress={() => navigationRef.navigate('Play')}
                    disabled={route === 'Play'}
                    // style={{ margin: 0, padding: 0, borderWidth: 1 }}
                />
                
                <Appbar.Action
                    icon='ladybug'
                    onPress={() => navigationRef.navigate('Bugs')}
                    disabled={route === 'Bugs'}
                    // style={{ margin: 0, padding: 0, borderWidth: 1 }}
                />

                <Appbar.Action
                    icon='logout-variant'
                    onPress={() => setModal('SETTINGS')}
                    // style={{ margin: 0, padding: 0, borderWidth: 1 }}
                />

            </Appbar.Header>
        </Appbar>
    )
}

export default Footer