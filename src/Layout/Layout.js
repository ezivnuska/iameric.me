import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView, View } from 'react-native'
import { AppNavigator } from '../navigators'
import linking from '../linking'
import { Footer, ImageUploadIndicator, Header, ModalFactory, Notification } from '@components'
import { useApp, useModal, useUser } from '@context'
import navigationRef from '@utils/navigation'
import { PaperProvider } from 'react-native-paper'

const Layout = () => {

    const {
        currentRoute,
        dims,
        landscape,
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
                // position: 'relative',
            }}
        >

            <PaperProvider theme={theme}>
                
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
                            // height: dims.height,
                            width: '100%',
                            minWidth: 300,
                            backgroundColor: theme?.colors.background,
                            position: 'relative',
                        }}
                    >

                        <View
                            style={{
                                flexGrow: 0,
                                zIndex: 1000,
                            }}
                        >
                            <Header
                                landscape={landscape}
                                user={user}
                                route={currentRoute}
                            />
                        </View>
                        
                        <View
                            style={{
                                flexGrow: 1,
                                width: '100%',
                                maxWidth: landscape ? 800 : 400,
                                marginHorizontal: 'auto',
                                zIndex: 100,
                            }}
                        >
                            <AppNavigator />

                        </View>

                        {currentRoute && (
                            <View style={{ flexGrow: 0, zIndex: 2000 }}>
                                <Footer
                                    landscape={landscape}
                                    route={currentRoute}
                                />
                            </View>
                        )}
                        
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
                            {/* <View
                                style={{
                                    flexGrow: 1,
                                    borderWidth: 1,
                                }}
                            > */}

                                <Notification />
                            {/* </View> */}
                        </View>

                    </View>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaView>
    )
}

export default Layout