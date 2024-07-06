import React, { useEffect, useMemo } from 'react'
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

    const numSockets = useMemo(() => {
        let sockets = 0
        if (connections) {
            const connection = connections.filter(c => c.socketId === socket.id)[0]
            if (connection && connection.sockets) {
                sockets = connection.sockets.length
            }
        }
        return sockets
    }, [connections, socket])
    
    const listItems = useMemo(() => {
		const array = []
		return connections.filter(connection => {
			if (!connection.username) return true
			else {
				const exists = array.indexOf(connection.username) > -1
				if (exists) return false
				else {
					array.push(connection.username)
					return true
				}
			}
		})
    }, [connections])

    const getShortId = id => {
        if (!id) return ''
        const prefix = '...'
        const last = id.substring(id.length - 3)
        return `${prefix}${last}`
    }

    const isConnection = id => id === socket.id



    const getDisplayName = () => {
        if (user) return user.username
        else return getShortId(socket.id)
    }

    const renderHeading = () => (
        <View style={{ gap: 10 }}>
            <ThemedText size={16}>
                {`${connections.length} open socket${connections.length > 1 ? `s` : ''}`}
            </ThemedText>

            <ThemedText style={{ marginBottom: 10 }} >
                {`Connected as ${getDisplayName()}`}
            </ThemedText>
        </View>
    )

    return (
        <View>

            {renderHeading()}

            <View
                style={{
                    
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: theme?.colors.border,
                }}
            >

                <View
                    style={{
                        gap: 7,
                        flexGrow: 1,
                        paddingBottom: 20,
                    }}
                >
                    {listItems && listItems.map((conn, key) => (
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
        </View>
    )
}