import React from 'react'
import { Layout } from '@layout'
import { AppContextProvider } from '@app'
import { SocketContextProvider } from '@socket'
import { NotificationContextProvider } from '@notification'
import { ModalContextProvider } from '@modal'
import { FormContextProvider } from '@forms'
import { compose as Compose } from '@utils'

export default App = () => {

    return (
        <NotificationContextProvider>
            <AppContextProvider>
                <SocketContextProvider>
                    <Compose
                        components={[
                            ModalContextProvider,
                            FormContextProvider,
                        ]}
                    >
                        <Layout />
                    </Compose>   
                </SocketContextProvider>
            </AppContextProvider>
        </NotificationContextProvider>
    )
}