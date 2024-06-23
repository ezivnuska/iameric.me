import React from 'react'
import { Layout } from '@layout'
import { AppContextProvider } from './AppContext'
import { SocketContextProvider } from './SocketContext'

export default () => {

    return (
        <AppContextProvider>
            <SocketContextProvider>
                <Layout />
            </SocketContextProvider>
        </AppContextProvider>
    )
}