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
        connected,
        connections,
        socketId,
    } = useSocket()

    const getShortId = id => {
        if (!id) return ''
        const prefix = '...'
        const last = id.substring(id.length - 3)
        return `${prefix}${last}`
    }

    const isConnection = connection => socketId === connection.socketId
    
    const renderSocketId = (id, label) => {
        return (
            <ThemedText
                color={isConnection({ socketId: id }) ? '#0f0' : theme?.colors.textDefault}
                bold={isConnection({ socketId: id }) ? true : false}
                size={16}
            >
                {label}
            </ThemedText>
        )
    }

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

                {renderSocketId(socketId, user ? user.username : getShortId(socketId))}

                {/* <ThemedText
                    color={isConnection({ socketId }) ? '#0f0' : theme?.colors.textDefault}
                    bold={isConnection({ socketId }) ? true : false}
                    size={16}
                >
                    {user ? user.username : getShortId(socketId)}
                </ThemedText> */}
            </View>

            <View
                style={{
                    gap: 7,
                    flexGrow: 1,
                    paddingBottom: 20,
                }}
            >
                {connections && connections.map((connection, key) => (
                    <ThemedText
                        key={key}
                        color={isConnection(connection) ? '#0f0' : theme?.colors.textDefault}
                        bold={isConnection(connection) ? true : false}
                        size={16}
                    >
                        {/* {getShorty(name)} */}
                        {connection.username || getShortId(connection.socketId)}
                    </ThemedText>
                ))}
            </View>
        </View>
    )
}