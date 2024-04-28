import React from 'react'
import {
    SafeAreaView,
} from 'react-native'
import AppNavigation from '../navigation/AppNavigation'
import {
    AuthModal,
    LoadingView,
} from '@components'
import { Header } from '.'
import {
    useApp,
    UserContextProvider,
} from '@context'

export default () => {
    
    const { appLoaded, dims, theme } = useApp()

    return (
        
        <SafeAreaView
            id='layout-container'
            style={{
                width: dims.width,
                height: dims.height,
                backgroundColor: theme?.colors.background,
            }}
        >
            {appLoaded
                ? (
                    <UserContextProvider>
                        <Header />
                        <AppNavigation />
                        <AuthModal />
                    </UserContextProvider>
                ) : <LoadingView loading='Initializing App...' />}
           
        </SafeAreaView>
    )
}