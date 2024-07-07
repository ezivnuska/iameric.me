import React from 'react'
import { Layout } from '@layout'
import { AppContextProvider } from '@app'
import { SocketContextProvider } from '@socket'
import { NotificationContextProvider } from '@notification'
import { ModalContextProvider } from '@modal'
import { FormContextProvider } from '@forms'
import { ForumContextProvider } from '@forum'

export default App = () => {

    return (
        <FormContextProvider>
            <ModalContextProvider>
                <NotificationContextProvider>
                    <AppContextProvider>
                        <ForumContextProvider>
                            <SocketContextProvider>
                                <Layout />
                            </SocketContextProvider>
                        </ForumContextProvider>
                    </AppContextProvider>
                </NotificationContextProvider>
            </ModalContextProvider>
        </FormContextProvider>
    )
}