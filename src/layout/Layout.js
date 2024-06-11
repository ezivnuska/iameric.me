import React, { useEffect, useMemo } from 'react'
import {
    SafeAreaView,
    View,
} from 'react-native'
import { AppNavigation } from '@navigation'
import {
    LoadingView,
    ModalView,
    // Sockets,
} from '@components'
import { Header } from '@layout'
import {
    CartContextProvider,
    ImageContextProvider,
    ProductContextProvider,
    OrderContextProvider,
    useApp,
    useOrders,
    // useContacts,
} from '@context'
import { PaperProvider } from 'react-native-paper'
import Compose from '../Compose'
import { classes } from '@styles'
// import socket from '../socket'

export default () => {
	const {
        appLoaded,
        connections,
		dims,
		profile,
        setConnections,
        socket,
		theme,
        userId,
	} = useApp()
    const {
        addOrder,
        removeOrder,
    } = useOrders()

    // let timer = undefined
    
    // useEffect(() => {
    //     timer = setTimeout(() => {
    //         setReady(true)
    //         timer = undefined
    //     }, 2000)
    // }, [])
    
    useEffect(() => {
        socket.on('new_connection', () => {
            console.log(`\n<< new_connection >> ${socket.id}`)
            if (userId) {
                socket.emit('user_signed_in', {
                    userId,
                    username: profile.username,
                })
            }
        })

        socket.on('connected_users', users => {
            setConnections(users)
        })
    
        socket.on('add_order', data => {
            console.log('<< add_order >>', data)
            addOrder(data)
        })
    
        socket.on('remove_order', id => {
            console.log('<< remove_order >>', id)
            removeOrder(id)
        })
    }, [])

	useEffect(() => {
        if (userId) {
            socket.emit('user_signed_in', {
                userId,
                username: profile.username,
            })
        }

        // maybe something to look into...

        // const handleFocus = () => {
        //     if (userId) {
        //         socket.emit('user_signed_in', {
        //             userId,
        //             username: profile.username,
        //         })  
        //     }
        // }

        // const handleBlur = () => {
        //     if (userId) {
        //         socket.emit('offline')
        //     }
        // }

        // window.addEventListener('blur', handleBlur)
        // window.addEventListener('focus', handleFocus)

        // return () => {
        //     window.removeEventListener('blur', handleBlur)
        //     window.removeEventListener('focus', handleFocus)
        // }
	}, [userId])

    if (!appLoaded) return <LoadingView loading='App Loading...' />

    return (
        <PaperProvider theme={theme}>
            <Compose
                components={[
                    CartContextProvider,
                    ProductContextProvider,
                    ImageContextProvider,
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