import React from 'react'
import { View } from 'react-native'
import { Badge, IconButton } from 'react-native-paper'
import { Row } from '@components'
import { useModal, useSocket, useTheme, useUser } from '@context'
import navigationRef from '@utils/navigation'
import { Size } from '@utils/stack'

const Connections = ({ connections, onPress }) => (
    <View
        style={{ position: 'relative' }}
    >
        <IconButton
            icon='lightning-bolt'
            onPress={onPress}
            style={{ margin: 0 }}
        />

        <Badge
            visible={connections.length > 0}
            style={{ position: 'absolute', top: 0, right: 0, margin: 0, padding: 0 }}
            size={16}
        >
            {connections.length}
        </Badge>
    </View>
)

const Footer = ({ route }) => {

    const { dark, toggleTheme } = useTheme()
    const { addModal } = useModal()
    const { connections } = useSocket()
    const { user } = useUser()

    
    return (
        <Row
            align='center'
            padding={[Size.None, Size.XS, Size.None, Size.M]}
            justify='space-between'
        >
            <Connections connections={connections} onPress={() => addModal('SOCKETS')} />

            <Row>
            
                <IconButton
                    icon={dark ? 'white-balance-sunny' : 'weather-night'}
                    onPress={toggleTheme}
                    style={{ margin: 0 }}
                />
                
                {user && (
                    <>
                        <IconButton
                            icon='grid'
                            onPress={() => navigationRef.navigate('Play')}
                            disabled={route === 'Play'}
                            style={{ margin: 0 }}
                        />
                        
                        <IconButton
                            icon='ladybug'
                            onPress={() => navigationRef.navigate('Bugs')}
                            disabled={route === 'Bugs'}
                            style={{ margin: 0 }}
                        />

                        <IconButton
                            icon='cog'
                            onPress={() => addModal('SETTINGS')}
                            style={{ margin: 0 }}
                        />
                    </>
                )}

            </Row>

        </Row>
    )
}

export default Footer