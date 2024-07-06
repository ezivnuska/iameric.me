import React from 'react'
import { Layout } from '@layout'
import { AppContextProvider } from './AppContext'
import { SocketContextProvider } from './SocketContext'
import { NotificationContextProvider } from '@components/Notification'
import { ModalContextProvider } from '@components/Modal'
import { FormContextProvider } from '@components/Form/FormContext'

export default () => {

    return (
        <ModalContextProvider>
            <NotificationContextProvider>
                <FormContextProvider>
                    <AppContextProvider>
                        <SocketContextProvider>
                            <Layout />
                        </SocketContextProvider>
                    </AppContextProvider>
                </FormContextProvider>
            </NotificationContextProvider>
        </ModalContextProvider>
    )
}