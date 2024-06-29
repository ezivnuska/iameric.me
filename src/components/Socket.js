import React from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import { useSocket } from '../SocketContext'
import { useApp } from '@app'
import { ThunderboltOutlined } from '@ant-design/icons'

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

    const isConnection = id => id === socketId

    const getSocketUsername = id => {
        if (!connections.length) return id
        const data = connections.filter(connection => connection.socketId === id)[0]
        if (!data) return id
        const { username, socketId } = data
        return username || (getShortId(socketId))
    }
    
    const renderSocketId = id => {
        if (!connections.length) return null
        const label = getSocketUsername(id)
        return (
            <ThemedText
                color={isConnection(id) ? '#0f0' : theme?.colors.textDefault}
                bold={isConnection(id) ? true : false}
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

                {renderSocketId(socketId)}

            </View>

            <View
                style={{
                    gap: 7,
                    flexGrow: 1,
                    paddingBottom: 20,
                }}
            >
                {connections && connections.map((connection, key) => (
                    <View
                        key={key}
                        style={{
                            flexDirection: 'row',
                            gap: 10,
                        }}
                    >
                        {renderSocketId(connection.socketId)}
                        {connection.userId && <ThunderboltOutlined style={{ marginLeft: 10, color: 'green' }} />}
                    </View>
                ))}
            </View>
        </View>
    )
}