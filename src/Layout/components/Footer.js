import React from 'react'
import { View } from 'react-native'
import { Appbar, Badge, IconButton } from 'react-native-paper'
import { useModal, useSocket, useTheme, useUser } from '@context'
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
    const { user } = useUser()

    
    return (
        <Appbar
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 1,
            }}
        >

            <Appbar.Header>
                <Connections connections={connections} onPress={() => setModal('SOCKETS')} />

            </Appbar.Header>

            <Appbar.Header>
            
                <Appbar.Action
                    icon={dark ? 'white-balance-sunny' : 'weather-night'}
                    onPress={toggleTheme}
                />
                
                {user && (
                    <>
                        <Appbar.Action
                            icon='grid'
                            onPress={() => navigationRef.navigate('Play')}
                            disabled={route === 'Play'}
                        />
                        
                        <Appbar.Action
                            icon='ladybug'
                            onPress={() => navigationRef.navigate('Bugs')}
                            disabled={route === 'Bugs'}
                        />

                        <Appbar.Action
                            icon='cog'
                            onPress={() => setModal('SETTINGS')}
                        />
                    </>
                )}

            </Appbar.Header>

        </Appbar>
    )
}

export default Footer