import React, { useEffect, useMemo } from 'react'
import {
    NavigationContainer,
    // DarkTheme as NavigationDarkTheme,
    // DefaultTheme as NavigationDefaultTheme,
    // ThemeProvider,
} from '@react-navigation/native'
import { SafeAreaView, View } from 'react-native'
import { AppNavigator } from '../navigators'
import linking from '../linking'
import { Footer, Header } from './components'
import { ImageUploadIndicator, ModalFactory, Notification } from '@components'
import { useApp, useModal, useUser, useTheme } from '@context'
import navigationRef from '@utils/navigation'
import { PaperProvider } from 'react-native-paper'
import { Colors } from '@constants'

const Layout = () => {
    
    const { currentRoute, setCurrentRoute } = useApp()
    const { modal, closeModal } = useModal()
    const { dims, landscape, theme } = useTheme()
    const { authUser } = useUser()

    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: dims.height,
                width: dims.width,
                // backgroundColor: theme.colors.background,
            }}
        >

            <PaperProvider theme={theme}>

                {/* <ThemeProvider value={paperTheme}> */}
                    <NavigationContainer
                        ref={navigationRef}
                        linking={linking}
                        theme={theme}
                        onStateChange={state => setCurrentRoute(navigationRef.getCurrentRoute())}
                        onReady={() => setCurrentRoute(navigationRef.getCurrentRoute())}
                        // fallback={<FallbackScreen />} // not working or used, necessary as of yet
                    >
                        <ModalFactory
                            modal={modal}
                            onClose={closeModal}
                        />
                        
                        <View
                            style={{
                                flex: 1,
                                // width: '100%',
                                // minWidth: 300,
                                // backgroundColor: theme?.colors.background,
                                position: 'relative',
                            }}
                        >

                            {/* <View style={{ flexGrow: 0, zIndex: 1000 }}>
                                <Header
                                    // landscape={landscape}
                                    // user={authUser}
                                    // route={currentRoute}
                                />
                            </View> */}
                            
                            <View
                                style={{
                                    flexGrow: 1,
                                    // width: '100%',
                                    // zIndex: 100,
                                    // borderWidth: 5,
                                    // borderStyle: 'dotted',
                                    // borderColor: 'yellow',
                                }}
                            >
                                <AppNavigator />

                            </View>

                            <View style={{ flexGrow: 0, zIndex: 2000 }}>
                                <Footer
                                    landscape={landscape}
                                    route={currentRoute}
                                />
                            </View>
                            
                            <ImageUploadIndicator style={{ zIndex: 2500 }} />

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
                    </NavigationContainer>
                {/* </ThemeProvider> */}
            </PaperProvider>
        </SafeAreaView>
    )
}

export default Layout