import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native'
import { Modal } from '@modules'
import AppNavigation from './AppNavigation'
import { useApp } from '@app'
import { Notification } from '@modules'
import { PaperProvider } from 'react-native-paper'
import navigationRef from '@utils/navigation'
import linking from './linking'
import Header from './Header'

export default () => {

    const {
        dims,
        theme,
    } = useApp()

    const [currentRoute, setCurrentRoute] = useState(null)

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
                    <Modal />
                    
                    <View
                        style={{
                            flex: 1,
                            height: dims.height,
                            width: '100%',
                            minWidth: 300,
                            backgroundColor: theme?.colors.background,
                        }}
                    >

                        <View style={ { flexGrow: 0 }}>
                            <Header route={currentRoute} />
                        </View>
                        
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ flexGrow: 1 }}
                            contentContainerStyle={{
                                flex: 1,
                                paddingHorizontal: 10,
                                width: '100%',
                                maxWidth: 400,
                                marginHorizontal: 'auto',
                            }}
                        >    
                            <AppNavigation />
                        </ScrollView>

                    </View>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaView>
    )
}