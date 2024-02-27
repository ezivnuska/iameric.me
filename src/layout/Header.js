import React, { useContext } from 'react'
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
import { useTheme } from 'react-native-paper'
import { AppContext } from '../AppContext'
import { navigationRef } from '../navigation/RootNavigation'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserButton = ({ user }) => {

    const theme = useTheme()
    
    const getSource = () => user.profileImage
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
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
                {user.username}
            </ThemedText>
            
        </Pressable>
    )
}

export default ({
    user,
}) => {
    
    const {
        cart,
        dispatch,
        isThemeDark,
        loading,
        toggleTheme,
    } = useContext(AppContext)
    
    const theme = useTheme()
    
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
                outline
                style={{ flexGrow: 0 }}
                textStyles={{ fontSize: 18 }}
            />

            {user && cart && cart.length && <CartButton style={{ marginLeft: 10 }} />}

            {user && <UserButton user={user} />}

            {user && (
                <IconButton
                    onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNOUT' })}
                    disabled={loading}
                    iconName='close-outline'
                    textStyles={{ color: theme?.colors.textDefault }}
                    transparent
                    style={{ flexGrow: 0 }}
                />
            )}
            
            {!user && (
                <IconButton
                    iconName='log-in-outline'
                    label='Sign In'
                    onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNIN' })}
                    disabled={loading}
                    alignIcon='right'
                    transparent
                />
            )}
        </View>
    )
}