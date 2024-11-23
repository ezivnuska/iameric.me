import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
    SafeAreaView,
    View,
} from 'react-native'
import { Header } from './components'
import AppNavigation from '../AppNavigation'
import linking from '../linking'
import { Modal } from '@modules'
import { useApp } from '@app'
import { useModal } from '@modal'
import { useUser } from '@user'
import { Notification } from '@modules'
import navigationRef from '@utils/navigation'
import { PaperProvider } from 'react-native-paper'

const Layout = () => {

    const {
        currentRoute,
        dims,
        theme,
        setCurrentRoute,
    } = useApp()

    const {
        modal,
        closeModal,
    } = useModal()

    const { user } = useUser()

    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: dims.height,
                width: dims.width,
                backgroundColor: theme?.colors.background,
                position: 'relative',
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 100,
                    height: 'auto',
                }}
            >
                <Notification />
            </View>

            <PaperProvider theme={theme}>
                
                <NavigationContainer
                    ref={navigationRef}
                    linking={linking}
                    theme={theme}
                    onStateChange={state => setCurrentRoute(navigationRef.getCurrentRoute())}
                    onReady={() => setCurrentRoute(navigationRef.getCurrentRoute())}
                    // fallback={<FallbackScreen />} // not working or used, necessary as of yet
                >
                    <Modal
                        modal={modal}
                        onClose={closeModal}
                    />
                    
                    <View
                        style={{
                            flex: 1,
                            height: dims.height,
                            width: '100%',
                            minWidth: 300,
                            backgroundColor: theme?.colors.background,
                        }}
                    >

                        <View style={ { flexGrow: 0, zIndex: 1000 }}>
                            <Header user={user} route={currentRoute} />
                        </View>
                        
                        <View
                            style={{
                                flexGrow: 1,
                                width: '100%',
                                maxWidth: 400,
                                marginHorizontal: 'auto',
                                zIndex: 100,
                            }}
                        >
                            <AppNavigation />
                        </View>

                    </View>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaView>
    )
}

export default Layout