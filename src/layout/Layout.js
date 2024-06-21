import React, { useEffect } from 'react'
import {
    SafeAreaView,
    View,
} from 'react-native'
import { AppNavigation } from '@navigation'
import {
    LoadingView,
    ModalView,
} from '@components'
import { Header } from './components'
import {
    CartContextProvider,
    ForumContextProvider,
    ImageContextProvider,
    ProductContextProvider,
    useApp,
    useContacts,
    useOrders,
} from '@context'
import { PaperProvider } from 'react-native-paper'
import Compose from '../Compose'
import { classes } from '@styles'

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
        addContact,
        removeContact,
        toggleStatus,
        updateContact,
    } = useContacts()
    const {
        addOrder,
        removeOrder,
        updateOrder,
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

        socket.on('changed_status', payload => {
            toggleStatus(payload)
        })

        socket.on('added_user', payload => {
            console.log('>>added_user<<', payload)
            addContact(payload)
        })

        socket.on('deleted_account', id => {
            removeContact(id)
        })

        socket.on('signed_out_user', id => {
            updateContact({
                _id: id,
                available: false,
            })
        })

        socket.on('signed_in_user', id => {
            updateContact({
                _id: id,
                available: false,
            })
        })

        socket.on('updated_order', data => {
            console.log('updating order...')
            updateOrder(data)
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
                    ForumContextProvider,
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