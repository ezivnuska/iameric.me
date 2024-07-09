import React from 'react'
import { Layout } from '@layout'
import { AppContextProvider } from '@app'
import { SocketContextProvider } from '@socket'
import { NotificationContextProvider } from '@notification'
import { MailContextProvider } from '@mail'
import { ModalContextProvider } from '@modal'
import { FormContextProvider } from '@form'
import { ForumContextProvider } from '@forum'
import { compose as Compose } from '@utils'

export default App = () => {

    return (
        <NotificationContextProvider>
            <AppContextProvider>
                <MailContextProvider>
                    <ForumContextProvider>
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
                    </ForumContextProvider>
                </MailContextProvider>
            </AppContextProvider>
        </NotificationContextProvider>
    )
}