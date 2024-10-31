import React, { useState } from 'react'
import { View } from 'react-native'
import Layout from '@layout'
import { AppContextProvider } from '@app'
import { BipContextProvider } from '@modules/Bipster'
import { ContactsContextProvider } from '@contacts'
import { ImagesContextProvider } from '@images'
import { SocketContextProvider } from '@socket'
import { NotificationContextProvider } from '@notification'
import { MailContextProvider } from '@mail'
import { ModalContextProvider } from '@modal'
import { FormContextProvider } from '@form'
import { compose as Compose } from '@utils'
import { GOOGLE_MAPS_API_KEY } from '../config'
import { APIProvider } from '@vis.gl/react-google-maps'
import { ActivityIndicator } from '@components'

export default () => {
    // console.log('process.env', process.env)
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY
    const [ mapsLoaded, setMapsLoaded ] = useState(false)
    return (
        <AppContextProvider>
            <APIProvider
                apiKey={apiKey}
                version='weekly'
                libraries={['marker', 'geocoding']}
                onLoad={() => {
                    setMapsLoaded(true)
                }}
            >
                {(mapsLoaded === true) ? (
                    <NotificationContextProvider>
                        <ModalContextProvider>
                            <SocketContextProvider>
                            {/* <BipContextProvider> */}
                                <ImagesContextProvider>
                                    {/* <MailContextProvider> */}
                                        {/* <SocketContextProvider> */}
                                            <FormContextProvider>
                                            {/* <Compose
                                                components={[
                                                    // ContactsContextProvider,
                                                    FormContextProvider,
                                                ]}
                                            > */}
                                                <Layout />
                                            {/* </Compose> */}
                                            </FormContextProvider>
                                        {/* </SocketContextProvider> */}
                                    {/* </MailContextProvider> */}
                                </ImagesContextProvider>
                            {/* </BipContextProvider> */}
                            </SocketContextProvider>
                        </ModalContextProvider>
                    </NotificationContextProvider>
                ) : (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <ActivityIndicator />
                    </View>
                )}
            </APIProvider>
        </AppContextProvider>
    )
}