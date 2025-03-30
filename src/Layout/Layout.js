import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView, View } from 'react-native'
import { AppNavigator } from '../navigators'
import linking from '../linking'
import { Footer } from './components'
import { ModalFactory, Notification } from '@components'
import { useApp, useModal, useTheme } from '@context'
import navigationRef from '@utils/navigation'
import { PaperProvider } from 'react-native-paper'

const Layout = () => {
    
    const { currentRoute, setCurrentRoute } = useApp()
    const { modal } = useModal()
    const { dims, landscape, theme } = useTheme()

    return (
        <View
            style={{
                flex: 1,
                height: dims.height,
                width: dims.width,
                backgroundColor: theme.colors.background,
            }}
        >
            <PaperProvider theme={theme}>

                <ModalFactory modal={modal} />

                <NavigationContainer
                    ref={navigationRef}
                    linking={linking}
                    theme={theme}
                    onStateChange={state => setCurrentRoute(navigationRef.getCurrentRoute())}
                    onReady={() => setCurrentRoute(navigationRef.getCurrentRoute())}
                    // fallback={<FallbackScreen />} // not working or used, necessary as of yet
                >

                    <View style={{ flex: 1, position: 'relative' }}>
                        
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                maxWidth: (!landscape && 600),
                                marginHorizontal: 'auto',
                            }}
                        >
                            <AppNavigator />

                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    zIndex: 3000,
                                    overflow: 'visible',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Notification />
                            </View>
                        </View>

                        <Footer
                            landscape={landscape}
                            route={currentRoute}
                        />

                    </View>

                </NavigationContainer>
            </PaperProvider>
        </View>
    )
}

export default Layout