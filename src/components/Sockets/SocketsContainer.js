import React, { useEffect } from 'react'
import {
    View,
    FlatList,
} from 'react-native'
import {
    ThemedText,    
} from '@components'
import {
    // useContacts,
    // useModal,
    useSocket,
} from '@context'

export default () => {
    
    const { connected, sockets } = useSocket()

    useEffect(() => {
        console.log('sockets', sockets)
    }, [sockets])
    useEffect(() => {
        console.log('connected', connected)
    }, [connected])

    return (
        <View
            style={{

            }}
        >
            <ThemedText>connected: {connected}</ThemedText>
            <FlatList
                data={sockets.map(socket => {
                    const { username } = socket
                    console.log('-->', username)
                    return username
                })}
                listKey={() => 'sockets'}
                keyExtractor={(item, index) => 'socket-' + index}
                renderItem={({ item, index }) => (
                    <View>
                        <ThemedText>{item}</ThemedText>
                    </View>
                )}
            />
        </View>
    )    
}