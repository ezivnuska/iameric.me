import React, { useMemo } from 'react'
import { FlatList, ScrollView } from'react-native'
import { Divider, IconButton, Text } from'react-native-paper'
import { Row, Stack } from '@components'
import { useModal, useSocket, useUser } from '@context'
import { Size } from '@utils/stack'

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

    return (
        <Stack
            flex={1}
        >
            <Row
                padding={[Size.XS, Size.XS, Size.None, Size.M]}
                align='center'
            >
                <Text
                    variant='headlineSmall'
                    style={{ flex: 1 }}
                >
                    {`Connections (${connections.length})`}
                </Text>

                <IconButton
                    icon='close-thick'
                    onPress={closeModal}
                    style={{ margin: 0, padding: 0 }}
                />

            </Row>

            <ScrollView
                style={{
                    marginVertical: 0,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Size.S,
                }}
            >

                <Stack
                    flex={1}
                    spacing={Size.M}
                    padding={[Size.S, Size.M]}
                >

                    <Text variant='titleLarge'>
                        {`Connected as ${username}`}
                    </Text>

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

                </Stack>

            </ScrollView>

        </Stack>
    )
}

export default Socket