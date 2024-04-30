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
    useApp,
    UserContextProvider,
} from '@context'
import { ActivityIndicator } from 'react-native-paper'

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
                    <UserContextProvider>
                        <Header />
                        <AppNavigation />
                        <ModalView />
                    </UserContextProvider>
                ) : (
                    <CenterVertical>
                        <ActivityIndicator size='large' />
                    </CenterVertical>
                )}
           
        </SafeAreaView>
    )
}