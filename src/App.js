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
        <SocketContextProvider>
            <Compose
                components={[
                    ModalContextProvider,
                    FormContextProvider,
                    AppContextProvider,
                    NotificationContextProvider,
                ]}
            >
                <Layout />
            </Compose>   
        </SocketContextProvider>
    )
}