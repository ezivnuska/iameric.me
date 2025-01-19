import React from 'react'
import { View } from 'react-native'
import { TextCopy } from '@components'
import { useSocket, useUser } from '@context'

const Socket = () => {

    const { connections, socket } = useSocket()
    const { user } = useUser()
    
    const getShortId = id => {
        if (!id) return ''
        const prefix = '-'
        const last = id.substring(id.length - 3)
        return `Guest${prefix}${last}`
    }

    const isConnection = id => id === socket.id

    const getDisplayName = () => user ? user.username : getShortId(socket.id)

    return (
        <SocketView
            connected={isConnection}
            connections={connections}
            username={getDisplayName()}
        />
    )
}

const SocketView = ({ connected, connections, username }) => {

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
                <TextCopy size={16}>
                    {`${connections.length || 'No'} connection${connections.length !== 1 ? `s` : ''}`}
                </TextCopy>
            </View>

            <View
                style={{
                    flexGrow: 0,
                    textAlign: 'right',
                }}
            >
                <TextCopy>
                    {`Connected as ${username}`}
                </TextCopy>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>

            {renderHeading()}

            <View
                style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#000',
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
                            <TextCopy
                                color={connected ? 'tomato' : theme?.colors.textDefault}
                                bold={connected ? true : false}
                                size={16}
                            >
                                {conn?.username || username}
                            </TextCopy>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default Socket