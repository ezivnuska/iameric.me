import React, { useEffect, useMemo } from 'react'
import { FlatList } from 'react-native'
import { Card, Divider, IconButton, Text } from 'react-native-paper'
import { useSocket, useModal, useUser } from '@context'

const Socket = () => {

    const { closeModal } = useModal()
    const { connections, socket } = useSocket()
    const { user } = useUser()
    
    const getShortId = id => {
        if (!id) return ''
        const prefix = '-'
        const last = id.substring(id.length - 3)
        return `Guest${prefix}${last}`
    }

    const username = useMemo(() => user ? user.username : getShortId(socket.id), [socket])

    // useEffect(() => {
    //     console.log('connections...', connections)
    // }, [])

    return (
        <Card>

            <Card.Title
                title={`Connections (${connections.length})`}
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />
            
            <Card>

                <Card.Title
                    title={`Connected as ${username}`}
                    titleVariant='headlineSmall'
                />

                <Card.Content style={{ marginVertical: 10 }}>
                    {connections && (
                        <FlatList
                            ItemSeparatorComponent={({ highlighted }) => <Divider />}
                            data={connections}
                            keyExtractor={item => `connection-${item.socketId}`}
                            // horizontal={landscape}
                            renderItem={({ item }) => (
                                <Text variant='titleMedium'>
                                    {item?.username || username}
                                </Text>
                            )}
                        />
                    )}
                </Card.Content>
            </Card>

        </Card>
    )
}

export default Socket