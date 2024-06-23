import React from 'react'
import { SocketContextProvider } from './SocketContext'
import SocketPanel from './SocketPanel'

export default () => {
    return (
        <SocketContextProvider>
            <SocketPanel />
        </SocketContextProvider>
    )
}