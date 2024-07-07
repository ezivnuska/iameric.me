import React from 'react'
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native'
import {
    Modal,
    SimpleButton,
    ThemedText,
} from '@components'
import AppNavigation from '../AppNavigation'
import { useApp } from '@app'
import { Notification } from '@components'
import { useSocket } from '@socket'
import {
    PaperProvider,
} from 'react-native-paper'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'
import { navigate } from '@utils/navigationRef'
import { useModal } from '@components/Modal/ModalContext'

const HEADER_HEIGHT = 50

// Header code at bottom

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
                    
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            flexGrow: 1,
                         }}
                        contentContainerStyle={{
                            flex: 1,
                            paddingHorizontal: 10,
                            paddingVertical: 20,
                            width: '100%',
                            maxWidth: 400,
                            marginHorizontal: 'auto',
                        }}
                    >    
                        <AppNavigation theme={theme} />
                    </ScrollView>

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

    const { setModal } = useModal()

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
                width: '100%',
                minWidth: 300,
                maxWidth: 400,
                paddingHorizontal: 10,
                marginHorizontal: 'auto',
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
                        <Pressable
                            onPress={() => navigate('Profile')}
                        >
                            <ThemedText>{user.username}</ThemedText>
                        </Pressable>

                        <SimpleButton
                            label={'Sign Out'}
                            onPress={() => handleSignout(user._id)}
                        />
                    </View>
                ) : (
                    <SimpleButton
                        label='Sign In or Sign Up'
                        onPress={() => setModal('AUTH')}
                    />
                )}
            </View>

            

        </View>
    )
}