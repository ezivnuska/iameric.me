import React, { useEffect, useMemo } from 'react'
import { FlatList } from 'react-native'
import { Card, Divider, IconButton, Text } from 'react-native-paper'
import { useSocket, useModal, useUser } from '@context'
import { ModalContainer } from '@components'

const Socket = () => {

    const { connections, socket } = useSocket()
    const { user } = useUser()
    
    const getShortId = id => {
        if (!id) return ''
        const prefix = '-'
        const last = id.substring(id.length - 3)
        return `Guest${prefix}${last}`
    }

    const username = useMemo(() => user ? user.username : getShortId(socket.id), [socket])

    return (
        <ModalContainer title={`Connections (${connections.length})`}>

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

        </ModalContainer>
    )
}

export default Socket