import React from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import { useSocket } from './SocketContext'
import { useApp } from '@app'

export default () => {
    const { user, theme } = useApp()
    const {
        connections,
        socket,
    } = useSocket()
    
    const getShortId = id => {
        if (!id) return ''
        const prefix = '-'
        const last = id.substring(id.length - 3)
        return `Guest${prefix}${last}`
    }

    const isConnection = id => id === socket.id

    const getDisplayName = () => {
        return user ? user.username : getShortId(socket.id)
    }

    const renderHeading = () => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 10,
                paddingHorizontal: 5,
                gap: 10,
            }}
        >
            <View
                style={{
                    flexGrow: 1,
                    flexShrink: 0,
                }}
            >
                <ThemedText size={16}>
                    {`${connections.length || 'No'} connection${connections.length !== 1 ? `s` : ''}`}
                </ThemedText>
            </View>

            <View
                style={{
                    flexGrow: 0,
                    textAlign: 'right',
                }}
            >
                <ThemedText>
                    {`Connected as ${getDisplayName()}`}
                </ThemedText>
            </View>
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
                        // paddingBottom: 20,
                    }}
                >
                    {connections.map((conn, key) => (
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