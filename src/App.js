import React, { useState } from 'react'
import { View } from 'react-native'
import Layout from './layout'
import {
    AppContextProvider,
    // BugContextProvider,
    // ContactsContextProvider,
    FormContextProvider,
    ModalContextProvider,
    NotificationContextProvider,
    SocketContextProvider,
    useApp,
    UserContextProvider,
} from './context'
import { GOOGLE_MAPS_API_KEY } from '../config'
import { APIProvider } from '@vis.gl/react-google-maps'

const Container = ({ children }) => {
    const { dims } = useApp()
    return (
        <View style={{ height: dims.height }}>
            {children}
        </View>
    )
}

const App = () => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY
    // const [ mapsLoaded, setMapsLoaded ] = useState(false)
    return (
        <AppContextProvider>
            <UserContextProvider>
                <Container>
                    {/* <APIProvider
                        apiKey={apiKey}
                        version='weekly'
                        libraries={['marker', 'geocoding']}
                        onLoad={() => setMapsLoaded(true)}
                    > */}
                        {/* {(mapsLoaded === true) ? ( */}
                            <NotificationContextProvider>
                                <FormContextProvider>
                                    <ModalContextProvider>
                                        <SocketContextProvider>

                                                <Layout />

                                        </SocketContextProvider>
                                    </ModalContextProvider>
                                </FormContextProvider>
                            </NotificationContextProvider>
                        {/* ) : <ActivityIndicator />} */}
                    {/* </APIProvider> */}
                </Container>
            </UserContextProvider>
        </AppContextProvider>
    )
}

export default App