import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
} from 'react-native'
import { AppNavigation } from '@navigation'
import {
    CenterVertical,
} from '@components'
import { Header } from '@layout'
import {
    ModalView,
} from '@components'
import {
    ContactContextProvider,
    ForumContextProvider,
    ImageContextProvider,
    ProductContextProvider,
    useApp,
} from '@context'
import {
    ActivityIndicator,
    PaperProvider,
} from 'react-native-paper'
import Compose from '../Compose'

export default () => {
    
    const { dims, theme } = useApp()
    const [ready, setReady] = useState(false)
    let timer = undefined
    
    useEffect(() => {
        timer = setTimeout(() => {
            setReady(true)
            timer = undefined
        }, 2000)
    }, [])

    return (
        <PaperProvider theme={theme}>
            <SafeAreaView
                id='layout-container'
                style={{
                    width: dims.width,
                    height: dims.height,
                    backgroundColor: theme?.colors.background,
                }}
            >
                    <Compose
                        components={[
                            ForumContextProvider,
                            ContactContextProvider,
                            ProductContextProvider,
                            ImageContextProvider,
                        ]}
                    >
                        {ready ? (
                            <>
                                <Header />
                                <AppNavigation />
                                <ModalView />
                            </>
                        ) : (
                            <CenterVertical>
                                <ActivityIndicator size='large' />
                            </CenterVertical>
                        )}
                    </Compose>
            
            </SafeAreaView>
        
        </PaperProvider>
    )
}