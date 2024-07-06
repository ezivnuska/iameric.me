import React from 'react'
import { Layout } from '@layout'
import { AppContextProvider } from './AppContext'
import { SocketContextProvider } from './SocketContext'
import { NotificationContextProvider } from '@components/Notification'

export default () => {

    return (
        <NotificationContextProvider>
            <AppContextProvider>
                <SocketContextProvider>
                    <Layout />
                </SocketContextProvider>
            </AppContextProvider>
        </NotificationContextProvider>
    )
}