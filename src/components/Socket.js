import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import { useSocket } from '../SocketContext'
import { useApp } from '@app'

export default () => {
    const { user, theme } = useApp()
    const {
        connections,
        socket,
    } = useSocket()

    const getShortId = id => {
        if (!id) return ''
        const prefix = '...'
        const last = id.substring(id.length - 3)
        return `${prefix}${last}`
    }

    const isConnection = id => id === socket.id

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme?.colors.border,
                gap: 20,
            }}
        >
            <View
                style={{
                    gap: 5,
                    flexGrow: 1,
                }}
            >
                <ThemedText
                    bold
                    size={18}
                >
                    Sockets: {connections.length}
                </ThemedText>

                
                <ThemedText
                    color={isConnection(socket.id) ? 'tomato' : theme?.colors.textDefault}
                    bold={isConnection(socket.id) ? true : false}
                    size={16}
                >
                    {user ? user.username : getShortId(socket.id)}
                </ThemedText>

            </View>

            <View
                style={{
                    gap: 7,
                    flexGrow: 1,
                    paddingBottom: 20,
                }}
            >
                {connections && connections.map((conn, key) => (
                    <View
                        key={key}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10,
                        }}
                    >
                        <ThemedText
                            color={isConnection(conn.socketId) ? 'tomato' : theme?.colors.textDefault}
                            bold={isConnection(conn.socketId) ? true : false}
                            size={16}
                        >
                            {conn.username ? conn.username : getShortId(conn.socketId)}
                        </ThemedText>
                    </View>
                ))}
            </View>
        </View>
    )
}