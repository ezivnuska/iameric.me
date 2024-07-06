import React from 'react'
import {
    Pressable,
    SafeAreaView,
    View,
} from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import AppNavigation from '../AppNavigation'
import { useApp } from '@app'
import NotificationList, { useNotification } from '@components/Notification'
import { useSocket } from '../SocketContext'
import {
    PaperProvider,
} from 'react-native-paper'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'

const HEADER_HEIGHT = 50

// Header code at bottom

export default () => {

    const {
        dims,
        theme,
        toggleTheme,
    } = useApp()

    const {
        notification,
    } = useNotification()

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
                        position: 'relative',
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 100,
                            height: 'auto',
                        }}
                    >
                        <NotificationList />
                    </View>

                    <View
                        style={{
                            flexBasis: HEADER_HEIGHT,
                            flexGrow: 0,
                        }}
                    >
                        <Header
                            height={HEADER_HEIGHT}
                            onPress={toggleTheme}
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

const Header = ({ height, onPress }) => {
    const {
        user,
        setUser,
    } = useApp()

    const {
        notifySocket,
    } = useSocket()

    const handleSignout = async id => {
        await signout(id)
        cleanStorage()
        notifySocket('user_signed_out', id)
        setUser(null)
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height,
                paddingHorizontal: 10,
            }}
        >
            <Pressable
                onPress={onPress}
                style={{ flex: 1, flexGrow: 1 }}
            >
                <ThemedText bold style={{ fontSize: 24 }}>iameric</ThemedText>
            </Pressable>

            <View
                style={{
                    flexBasis: 'auto',
                    flexGrow: 0,
                }}
            >
                {user ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <ThemedText>{user.username}</ThemedText>
                        <SimpleButton
                            label={'Sign Out'}
                            onPress={() => handleSignout(user._id)}
                        />
                    </View>
                ) : null}
            </View>

            

        </View>
    )
}