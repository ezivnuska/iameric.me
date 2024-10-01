import React, { useState } from 'react'
import Layout from '@layout'
import { AppContextProvider } from '@app'
import { BipContextProvider } from '@bips'
import { ContactsContextProvider } from '@contacts'
import { ImagesContextProvider } from '@images'
import { SocketContextProvider } from '@socket'
import { NotificationContextProvider } from '@notification'
import { MailContextProvider } from '@mail'
import { ModalContextProvider } from '@modal'
import { FormContextProvider } from '@form'
import { ForumContextProvider } from '@forum'
import { compose as Compose } from '@utils'
import { GOOGLE_MAPS_API_KEY } from './../config'
import { APIProvider } from '@vis.gl/react-google-maps'

export default App = () => {
    console.log('process.env', process.env)
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY
    const [ mapsLoaded, setMapsLoaded ] = useState(false)
    return (
        <NotificationContextProvider>
            <APIProvider
                apiKey={apiKey}
                version='weekly'
                libraries={['marker', 'geocoding']}
                onLoad={() => setMapsLoaded(true)}
            >
                {(mapsLoaded === true) && (
                    <AppContextProvider>
                        <BipContextProvider>
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
                        </BipContextProvider>
                    </AppContextProvider>
                )}
            </APIProvider>
        </NotificationContextProvider>
    )
}