import React, { useState } from 'react'
import { View } from 'react-native'
import Layout from './layout'
import {
    AppContextProvider,
    BugContextProvider,
    FeedContextProvider,
    FormContextProvider,
    ModalContextProvider,
    NotificationContextProvider,
    SocketContextProvider,
    useTheme,
    ThemeContextProvider,
    UserContextProvider,
} from './context'
import { GOOGLE_MAPS_API_KEY } from '../config'
import { APIProvider } from '@vis.gl/react-google-maps'

const Container = ({ children }) => {
    const { dims } = useTheme()
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
            <ThemeContextProvider>
                <FormContextProvider>
                    <UserContextProvider>
                        <SocketContextProvider>
                            <Container>
                                {/* <APIProvider
                                    apiKey={apiKey}
                                    version='weekly'
                                    libraries={['marker', 'geocoding']}
                                    onLoad={() => setMapsLoaded(true)}
                                > */}
                                {/* {(mapsLoaded === true) ? ( */}
                                    <NotificationContextProvider>
                                        <ModalContextProvider>
                                            <FeedContextProvider>
                                                <BugContextProvider>
                                                                        <Layout />
                                                </BugContextProvider>
                                            </FeedContextProvider>
                                        </ModalContextProvider>
                                    </NotificationContextProvider>
                                    {/* ) : <ActivityIndicator />} */}
                                {/* </APIProvider> */}
                            </Container>
                        </SocketContextProvider>
                    </UserContextProvider>
                </FormContextProvider>
            </ThemeContextProvider>
        </AppContextProvider>
    )
}

export default App