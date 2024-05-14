import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
} from 'react-native'
import { AppNavigation } from '@navigation'
import {
    ModalView,
    OrderDisplayView,
} from '@components'
import { Header } from '@layout'
import {
    CartContextProvider,
    OrderContextProvider,
    UserContextProvider,
    useApp,
    useUser,
} from '@context'
import { PaperProvider } from 'react-native-paper'
import Compose from '../Compose'

export default () => {

    const { dims, theme } = useApp()
    
    // const [ready, setReady] = useState(false)
    // let timer = undefined
    
    // useEffect(() => {
    //     timer = setTimeout(() => {
    //         setReady(true)
    //         timer = undefined
    //     }, 2000)
    // }, [])

    return (
        <PaperProvider theme={theme}>
            <Compose
                components={[
                    CartContextProvider,
                    OrderContextProvider,
                    UserContextProvider,
                ]}
            >
                <SafeAreaView
                    id='layout-container'
                    style={{
                        width: dims.width,
                        height: dims.height,
                        backgroundColor: theme?.colors.background,
                    }}
                >
                    <Header />
                    <OrderDisplayView />
                    <AppNavigation />
                    <ModalView />
                </SafeAreaView>
            </Compose>
        </PaperProvider>
    )
}