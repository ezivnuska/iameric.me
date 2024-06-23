import React, { useEffect, useState } from 'react'
import {
    Pressable,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import AppNavigation from '../AppNavigation'
import { useApp } from '@app'
import {
    PaperProvider,
} from 'react-native-paper'

const HEADER_HEIGHT = 40

// Header code at bottom

export default () => {

    const {
        dims,
        setToken,
        theme,
        token,
        toggleTheme,
    } = useApp()

    const [auth, setAuth] = useState(false)

    useEffect(() => {
        setAuth(token)
    }, [token])

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
                            token={token}
                            setToken={setToken}
                        />
                    </View>

                    <View
                        style={{
                            flexBasis: 'auto',
                            flexGrow: 1,
                        }}
                    >
                        <AppNavigation theme={theme} />
                    </View>
                </View>
            </PaperProvider>
        </SafeAreaView>
    )
}

const Header = ({ height, onPress, setToken, token }) => {
    
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height,
            }}
        >
            <Pressable
                onPress={onPress}
                style={{ flex: 1, flexGrow: 1 }}
            >
                <ThemedText bold style={{ fontSize: 24 }}>iameric</ThemedText>
            </Pressable>

            <SimpleButton
                label={token ? 'Sign Out' : 'Sign In'}
                onPress={() => setToken(!token)}
                style={{ flexBasis: 'auto', flexGrow: 0 }}
            />

        </View>
    )
}