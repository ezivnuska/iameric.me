import React from 'react'
import { useSocket, useUser } from '@context'
import SocketView from './SocketView'

const SocketContainer = () => {

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

export default SocketContainer