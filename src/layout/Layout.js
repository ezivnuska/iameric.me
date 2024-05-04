import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
} from 'react-native'
import { AppNavigation } from '@navigation'
import {
    CenterVertical,
    ModalView,
} from '@components'
import { Header } from '@layout'
import {
    ContactContextProvider,
    ImageContextProvider,
    ProductContextProvider,
    useApp,
    UserContextProvider,
} from '@context'
import { ActivityIndicator } from 'react-native-paper'
import Compose from '../Compose'

export default () => {
    
    const { appLoaded, dims, theme } = useApp()
    const [ready, setReady] = useState(false)
    let timer = undefined
    
    useEffect(() => {
        timer = setTimeout(() => setReady(true), 2000)
    }, [])

    return (
        
        <SafeAreaView
            id='layout-container'
            style={{
                width: dims.width,
                height: dims.height,
                backgroundColor: theme?.colors.background,
            }}
        >
            {appLoaded && ready
                ? (
                    <Compose
                        components={[
                            ContactContextProvider,
                            ImageContextProvider,
                            UserContextProvider,
                            ProductContextProvider,
                        ]}
                    >
                        <Header />
                        <AppNavigation />
                        <ModalView />
                    </Compose>
                ) : (
                    <CenterVertical>
                        <ActivityIndicator size='large' />
                    </CenterVertical>
                )}
           
        </SafeAreaView>
    )
}