import React, { useEffect, useMemo } from 'react'
import {
    SafeAreaView,
    View,
} from 'react-native'
import { AppNavigation } from '@navigation'
import {
    ModalView,
    // Sockets,
} from '@components'
import { Header } from '@layout'
import {
    CartContextProvider,
    ContactContextProvider,
    ImageContextProvider,
    ProductContextProvider,
    OrderContextProvider,
    useApp,
} from '@context'
import { PaperProvider } from 'react-native-paper'
import Compose from '../Compose'
import { classes } from '@styles'

export default () => {
	const {
		dims,
		profile,
		theme,
	} = useApp()

	// const {
    //     addSocket,
    //     // connected,
    //     // removeSocket,
    //     // setConnected,
    // } = useSocket()
    
    

    // const socket = io()
    
    // const [ready, setReady] = useState(false)
    // let timer = undefined
    
    // useEffect(() => {
    //     timer = setTimeout(() => {
    //         setReady(true)
    //         timer = undefined
    //     }, 2000)
    // }, [])
    
    // useEffect(() => {
    //     if (profile) {
    //         console.log('emitting << user_signed_in >> from layout', profile)
    //         socket.emit('user_signed_in', profile, () => {
    //             console.log(`${profile.username} signed in`)
    //         })
    //     }
    // }, [profile])

	// useEffect(() => {
	// 	console.log('profile', profile)
	// 	if (profile) {
    //         console.log('emitting << user_signed_in >>', profile)
	// 		socket.emit('user_signed_in', profile)
	// 	}
	// }, [profile])

    return (
        <PaperProvider theme={theme}>
            <Compose
                components={[
                    ContactContextProvider,
                    CartContextProvider,
                    ProductContextProvider,
                    ImageContextProvider,
                    OrderContextProvider,
                ]}
            >
                {dims && (
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
                        <View style={[classes.screen, { flexGrow: 0 }]}>
                            <Header />
                        </View>

                        {/* <Sockets /> */}

                        <View style={[classes.screen, { flexGrow: 1 }]}>
                            <AppNavigation />
                        </View>

                        <ModalView />

                    </SafeAreaView>
                )}
            </Compose>
        </PaperProvider>
    )
}