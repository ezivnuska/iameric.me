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
import { GOOGLE_MAPS_API_KEY } from '../config'
import { APIProvider } from '@vis.gl/react-google-maps'

export default App = () => {

    return (
        <NotificationContextProvider>
            <AppContextProvider>
                <ImagesContextProvider>
                    <MailContextProvider>
                        <ForumContextProvider>
                            <SocketContextProvider>
                                <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['marker', 'geocoding']}>
                                    <Compose
                                        components={[
                                            ContactsContextProvider,
                                            ModalContextProvider,
                                            FormContextProvider,
                                        ]}
                                    >
                                        <Layout />
                                    </Compose>
                                </APIProvider>
                            </SocketContextProvider>
                        </ForumContextProvider>
                    </MailContextProvider>
                </ImagesContextProvider>
            </AppContextProvider>
        </NotificationContextProvider>
    )
}