import React from 'react'
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { Modal } from '@modules'
import AppNavigation from '../AppNavigation'
import { useApp } from '@app'
import { Notification } from '@modules'
import { useSocket } from '@socket'
import { useModal } from '@modal'
import { signout } from '@utils/auth'
import { cleanStorage } from '@utils/storage'
import { navigate } from '@utils/navigation'
import { PaperProvider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

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

                    <View style={ {flexGrow: 0 }}>
                        <Header/>
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
                        <AppNavigation theme={theme} />
                    </ScrollView>

                </View>
            </PaperProvider>
        </SafeAreaView>
    )
}

const Header = () => {
    const {
        dims,
        reset,
        theme,
        user,
    } = useApp()

    const { setModal } = useModal()
    
    const { notifySocket } = useSocket()

    const handleSignout = async id => {
        await signout(id)
        notifySocket('user_signed_out', id)
        cleanStorage()
        reset()
    }

    const renderBrand = () => dims.width < 340 ? 'iam' : 'iameric'

    const renderSignOutButton = () => {
        return dims.width < 390 ? (
            <SimpleButton onPress={() => handleSignout(user._id)}>
                <Icon
                    name='close-outline'
                    size={20}
                    color='#fff'
                />
            </SimpleButton>
        ) : (
            <SimpleButton
                label={'Sign Out'}
                onPress={() => handleSignout(user._id)}
            />
        )
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                height: HEADER_HEIGHT,
                width: '100%',
                minWidth: 300,
                maxWidth: 400,
                paddingHorizontal: 10,
                marginHorizontal: 'auto',
            }}
        >
            <View style={{ flexGrow: 0 }}>
                <Pressable onPress={() => navigate('Home')}>
                    <ThemedText bold style={{ fontSize: 24 }}>
                        {renderBrand()}
                    </ThemedText>
                </Pressable>
            </View>

            <View
                style={{
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                
                {user && (
                    <>
                        <Pressable
                            onPress={() => navigate('Home')}
                            style={{ padding: 5 }}
                        >
                            <Icon
                                name='home-outline'
                                size={16}
                                color={theme?.colors.textDefault}
                            />
                        </Pressable>

                        <Pressable
                            onPress={() => navigate('Forum')}
                            style={{ padding: 5 }}
                        >
                            <Icon
                                name='chatbubbles-outline'
                                size={16}
                                color={theme?.colors.textDefault}
                            />
                        </Pressable>

                        <Pressable
                            onPress={() => navigate('Contacts')}
                            style={{ padding: 5 }}
                        >
                            <Icon
                                name='people-outline'
                                size={16}
                                color={theme?.colors.textDefault}
                            />
                        </Pressable>

                        <Pressable
                            onPress={() => navigate('Mail')}
                            style={{ padding: 5 }}
                        >
                            <Icon
                                name='mail-outline'
                                size={16}
                                color={theme?.colors.textDefault}
                            />
                        </Pressable>
                    </>
                )
            }
            </View>

                        
            <View
                style={{
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
                        <Pressable onPress={() => navigate('Profile')}>
                            <ThemedText>{user.username}</ThemedText>
                        </Pressable>

                        {renderSignOutButton()}
                    </View>
                ) : (
                    <SimpleButton
                        label='Sign In'
                        onPress={() => setModal('AUTH')}
                    />
                )}
            </View>

        </View>
    )
}