import React from 'react'
import {
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import AppNavigation from '../AppNavigation'
import { useApp } from '../AppContext'
import {
    PaperProvider,
} from 'react-native-paper'

const HEADER_HEIGHT = 50

// Header component at bottom

export default () => {

    const { dims, theme } = useApp()

    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: dims.height,
                minWidth: 300,
                maxWidth: 400,
                marginHorizontal: 'auto',
            }}
        >
            <PaperProvider theme={theme}>
                <View
                    style={{
                        flexBasis: HEADER_HEIGHT,
                        flexGrow: 0,
                    }}
                >
                    <Header height={HEADER_HEIGHT} />
                </View>
                
                {/* 
                * needs to be scrollview. maybe here...?
                */}

                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 1,
                        backgroundColor: 'pink',
                    }}
                >
                    <AppNavigation theme={theme} />
                </View>

            </PaperProvider>
        </SafeAreaView>
    )
}

const Header = ({ height }) => {
    
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height,
            }}
        >
            <Text style={{ fontSize: 24 }}>iameric</Text>
        </View>
    )
}