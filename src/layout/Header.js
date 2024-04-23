import React from 'react'
import {
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    Brand,
    CartButton,
    IconButton,
    ThemedText,
} from '@components'
import {
    useAuth,
    useApp,
    useModal,
    useUser,
} from '@context'
import { navigationRef } from '../navigation/RootNavigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserButton = () => {

    const { authStatus, profile, username, setAuthModal } = useAuth()
    const { theme } = useApp()
    const { profileImage } = useUser()
    
    const getSource = () => profileImage
        ? `${IMAGE_PATH}/${username}/${profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`
    
    return (
        <Pressable
            onPress={() => navigationRef.navigate('Profile')}
            style={{
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                paddingHorizontal: 8,
                marginLeft: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: theme?.colors.screen,
                shadowColor: theme?.colors.shadow,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 1,
                paddingVertical: 3,
            }}
        >
            <Image
                source={getSource()}
                style={{
                    flexBasis: 26,
                    flexGrow: 0,
                    width: 26,
                    height: 26,
                    marginRight: 5,
                    borderRadius: 13,
                    overflow: 'hidden',
                    resizeMode: 'cover',
                }}
                // onLoadStart={() => setLoading(true)}
                // onLoadEnd={() => setLoading(false)}
            />

            <ThemedText
                style={{
                    flex: 1,
                    fontWeight: 700,
                    lineHeight: 30,
                }}
            >
                {authStatus}
            </ThemedText>
            
        </Pressable>
    )
}

export default () => {

    const { authStatus } = useAuth()
    const { night, toggleTheme } = useApp()
    
    return (
        <View
            style={{
                // flex: 1,
                flexDirection: 'row',
                // alignItems: 'flex-end',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5,
                opacity: 1,
                flexWrap: 'wrap',
            }}
        >
            <Brand onPress={toggleTheme} />

            <IconButton
                iconName={`${night ? 'sunny' : 'moon'}-outline`}
                onPress={toggleTheme}
                transparent
                style={{ flexGrow: 0 }}
                textStyles={{ fontSize: 18 }}
            />

            {authStatus
                ? (
                    <>
                        <CartButton style={{ marginLeft: 10 }} />
                        <UserButton user={authStatus} />
                        <SignOutButton />
                    </>
                ) : (
                    <SignInButton />
                )
            }
        </View>
    )
}

const SignInButton = () => {

    const { authLoading, setAuthModal } = useAuth()
    
    return (
        <IconButton
            iconName='log-in-outline'
            label='Sign In'
            onPress={() => setAuthModal('SIGN_IN')}
            disabled={authLoading}
            alignIcon='right'
            transparent
        />
    )
}

const SignOutButton = () => {

    const { setModal } = useModal()
    const { theme } = useApp()
    const { authLoading, setAuthModal } = useAuth()
    
    return (
        <IconButton
            onPress={() => setAuthModal('SIGN_OUT')}
            disabled={authLoading}
            iconName='close-outline'
            textStyles={{
                color: theme?.colors.textDefault,
                fontSize: 22,
            }}
            transparent
            style={{
                flexGrow: 0,
                marginHorizontal: 8,
            }}
        />
    )
}