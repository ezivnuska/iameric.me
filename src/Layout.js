import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    View,
} from 'react-native'
import {
    IconButton,
    SimpleButton,
    ThemedText,
} from '@components'
import { Modal } from '@modules'
import AppNavigation from './AppNavigation'
import { useApp } from '@app'
import { Notification } from '@modules'
import { useModal } from '@modal'
import { PaperProvider } from 'react-native-paper'
import navigationRef, { navigate } from '@utils/navigation'
import linking from './linking'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'
const HEADER_HEIGHT = 50

// Header code at bottom

export default () => {

    const {
        dims,
        theme,
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
                
                <NavigationContainer
                    ref={navigationRef}
                    linking={linking}
                    theme={theme}
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
                            <Header />
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

const Header = () => {

    const {
        dims,
        reset,
        theme,
        user,
    } = useApp()

    const { setModal } = useModal()

    const renderBrand = () => dims.width < 340 ? 'iam' : 'iameric'

    const source = (user && user.profileImage)
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default.png`

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
                <Pressable
                    onPress={() => {
                        console.log('pressed')
                        navigate('Home')
                    }}
                >
                    <ThemedText bold style={{ fontSize: 24 }}>
                        {renderBrand()}
                    </ThemedText>
                </Pressable>
            </View>

            <View style={{ flexGrow: 1 }}>
                
                {user && (
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            gap: 3,
                            // borderLeftWidth: 1,
                            // borderRightWidth: 1,
                        }}
                    >
                        <IconButton
                            onPress={() => navigate('Home')}
                            name='home-outline'
                            // disabled={routeName === 'Home'}
                        />

                        <IconButton
                            name='chatbubbles-outline'
                            onPress={() => navigate('Forum')}
                            // disabled={routeName === 'Forum'}
                        />

                        <IconButton
                            name='people-outline'
                            onPress={() => navigate('Contacts')}
                            // disabled={routeName === 'Contacts'}
                        />

                        <IconButton
                            name='mail-outline'
                            onPress={() => navigate('Mail')}
                            // disabled={routeName === 'Mail'}
                        />
                    </View>
                )
            }
            </View>

            <View style={{ flexGrow: 0 }}>

                {user ? (
                    <Pressable
                        onPress={() => navigate('User')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: theme?.colors.textDefault,
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                source={source}
                                style={{
                                    width: 24,
                                    height: 24,
                                    resizeMode: 'cover',
                                }}
                            />
                        </View>

                        <ThemedText>{user.username}</ThemedText>
                        
                    </Pressable>
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