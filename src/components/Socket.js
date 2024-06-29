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

    const getShorty = name => {
        let shortName = name
        if (shortName.length > 14) shortName = String(shortName).substring(0, 14)
        return `${shortName}...`
    }

    const isConnection = connection => {
        if (
            !user
            ||
            user.username !== connection.username
            ||
            socketId !== connection.socketId
        ) return false
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

                <ThemedText
                    bold
                    size={12}
                >
                    {user ? user.username : socketId}
                </ThemedText>
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
                        {connection.username || connection.socketId}
                    </ThemedText>
                ))}
            </View>
        </View>
    )
}