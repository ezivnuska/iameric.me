import React from 'react'
import Layout from '@layout'
import { AppContextProvider } from '@app'
import { ContactsContextProvider } from '@contacts'
import { ImagesContextProvider } from '@images'
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
                <ImagesContextProvider>
                    <MailContextProvider>
                        <ForumContextProvider>
                            <SocketContextProvider>
                                <Compose
                                    components={[
                                        ContactsContextProvider,
                                        ModalContextProvider,
                                        FormContextProvider,
                                    ]}
                                >
                                    <Layout />
                                </Compose>   
                            </SocketContextProvider>
                        </ForumContextProvider>
                    </MailContextProvider>
                </ImagesContextProvider>
            </AppContextProvider>
        </NotificationContextProvider>
    )
}