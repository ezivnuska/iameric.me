import React, { useState } from 'react'
import { View } from 'react-native'
import Layout from '@layout'
import { AppContextProvider, useApp } from '@app'
import { BipContextProvider } from '@modules/Bipster'
import { ContactsContextProvider } from '@contacts'
import { ImagesContextProvider } from '@images'
import { SocketContextProvider } from '@socket'
import { NotificationContextProvider } from '@notification'
import { ModalContextProvider } from '@modal'
import { FormContextProvider } from '@form'
import { compose as Compose } from '@utils'
import { GOOGLE_MAPS_API_KEY } from '../config'
import { APIProvider } from '@vis.gl/react-google-maps'
import { ActivityIndicator } from '@components'

const Container = ({ children }) => {
    const { dims } = useApp()
    return (
        <View style={{ height: dims.height, borderWidth: 1 }}>
            {children}
        </View>
    )
}

export default () => {
    // console.log('process.env', process.env)
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY
    const [ mapsLoaded, setMapsLoaded ] = useState(false)
    return (
        <AppContextProvider>
            <Container>
                <APIProvider
                    apiKey={apiKey}
                    version='weekly'
                    libraries={['marker', 'geocoding']}
                    onLoad={() => setMapsLoaded(true)}
                >
                    {(mapsLoaded === true) ? (
                        <NotificationContextProvider>
                            <ModalContextProvider>
                                <SocketContextProvider>
                                {/* <BipContextProvider> */}
                                    <ImagesContextProvider>
                                        {/* <SocketContextProvider> */}
                                            <FormContextProvider>
                                            {/* <Compose
                                                components={[
                                                    // ContactsContextProvider,
                                                    // FormContextProvider,
                                                ]}
                                            > */}
                                                <Layout />
                                            {/* </Compose> */}
                                            </FormContextProvider>
                                        {/* </SocketContextProvider> */}
                                    </ImagesContextProvider>
                                {/* </BipContextProvider> */}
                                </SocketContextProvider>
                            </ModalContextProvider>
                        </NotificationContextProvider>
                    ) : <ActivityIndicator />}
                </APIProvider>
            </Container>
        </AppContextProvider>
    )
}