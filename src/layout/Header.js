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
    useApp,
    useModal,
    useUser,
} from '@context'
import { navigationRef } from '../navigation/RootNavigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserButton = () => {

    const { theme } = useApp()
    const { profile } = useUser()
    
    const getSource = () => profile.profileImage
        ? `${IMAGE_PATH}/${profile.username}/${profile.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`
    
    return (
        <Pressable
            onPress={() => navigationRef.navigate('Settings')}
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
                {profile.username}
            </ThemedText>
            
        </Pressable>
    )
}

export default () => {

    const { profile } = useUser()
    const { isThemeDark, toggleTheme } = useApp()
    
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5,
                opacity: 1,
                flexWrap: 'wrap',
            }}
        >
            <Brand onPress={toggleTheme} />

            <IconButton
                iconName={`${isThemeDark ? 'sunny' : 'moon'}-outline`}
                onPress={toggleTheme}
                transparent
                style={{ flexGrow: 0 }}
                textStyles={{ fontSize: 18 }}
            />

            {profile
                ? (
                    <>
                        <CartButton style={{ marginLeft: 10 }} />
                        <UserButton user={profile} />
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

    const { setModal } = useModal()
    const { authLoading } = useAuth()
    
    return (
        <IconButton
            iconName='log-in-outline'
            label='Sign In'
            onPress={() => setModal('SIGNIN')}
            disabled={authLoading}
            alignIcon='right'
            transparent
        />
    )
}

const SignOutButton = () => {

    const { setModal } = useModal()
    const { authLoading, theme } = useApp()
    
    return (
        <IconButton
            onPress={() => setModal('SIGNOUT')}
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