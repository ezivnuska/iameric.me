import React from 'react'
import {
    SafeAreaView,
    View,
} from 'react-native'
import { AppNavigation } from '@navigation'
import {
    ModalView,
} from '@components'
import { Header } from '@layout'
import {
    CartContextProvider,
    ImageContextProvider,
    OrderContextProvider,
    ProductContextProvider,
    UserContextProvider,
    useApp,
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
                    OrderContextProvider,
                    CartContextProvider,
                    ProductContextProvider,
                    ImageContextProvider,
                    UserContextProvider,
                ]}
            >
                <SafeAreaView
                    id='layout-container'
                    style={{
                        width: dims.width,
                        height: dims.height,
                        backgroundColor: theme?.colors.background,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }}
                >
                    <View style={{ flexBasis: 50 }}>
                        <Header />
                    </View>
                    <View style={{ flexBasis: 'auto', flexGrow: 1 }}>
                        <AppNavigation />
                    </View>
                    <ModalView />
                </SafeAreaView>
            </Compose>
        </PaperProvider>
    )
}