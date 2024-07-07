import React from 'react'
import { Layout } from '@layout'
import { AppContextProvider } from '@app'
import { SocketContextProvider } from '@socket'
import { NotificationContextProvider } from '@notification'
import { ModalContextProvider } from '@modal'
import { FormContextProvider } from '@forms'

export default App = () => {

    return (
        <FormContextProvider>
            <ModalContextProvider>
                <NotificationContextProvider>
                    <AppContextProvider>
                        <SocketContextProvider>
                            <Layout />
                        </SocketContextProvider>
                    </AppContextProvider>
                </NotificationContextProvider>
            </ModalContextProvider>
        </FormContextProvider>
    )
}