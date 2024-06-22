import React from 'react'
import {
    Pressable,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import AppNavigation from '../AppNavigation'
import { useApp } from '@app'
import {
    PaperProvider,
} from 'react-native-paper'

const HEADER_HEIGHT = 50

// Header component at bottom

export default () => {

    const {
        dims,
        theme,
        toggleTheme,
    } = useApp()

    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: dims.height,
                width: dims.width,
                backgroundColor: theme?.colors.background,
            }}
        >
            <PaperProvider theme={theme}>
                <View
                    style={{
                        flex: 1,
                        height: dims.height,
                        width: '100%',
                        minWidth: 300,
                        maxWidth: 400,
                        marginHorizontal: 'auto',
                        backgroundColor: theme?.colors.background,
                    }}
                >
                    <View
                        style={{
                            flexBasis: HEADER_HEIGHT,
                            flexGrow: 0,
                        }}
                    >
                        <Header
                            height={HEADER_HEIGHT}
                            onPress={toggleTheme}
                            theme={theme}
                        />
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
                </View>
            </PaperProvider>
        </SafeAreaView>
    )
}

const Header = ({ height, onPress, theme }) => {
    
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                height,
            }}
        >
            <Pressable
                onPress={onPress}
            >
                <ThemedText bold style={{ fontSize: 24 }}>iameric</ThemedText>
            </Pressable>
        </View>
    )
}