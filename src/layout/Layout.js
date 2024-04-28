import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
} from 'react-native'
import AppNavigation from '../navigation/AppNavigation'
import {
    AuthModal,
    CenterVertical,
    UserModal,
} from '@components'
import { Header } from '.'
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
        timer = setTimeout(() => {
            console.log('setting ready')
            setReady(true)
        }, 2000)
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
                        <AuthModal />
                        <UserModal />
                    </UserContextProvider>
                ) : (
                    <CenterVertical>
                        <ActivityIndicator size='large' />
                    </CenterVertical>
                )}
           
        </SafeAreaView>
    )
}