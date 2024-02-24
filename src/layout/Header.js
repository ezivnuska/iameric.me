import React, { useContext } from 'react'
import {
    useWindowDimensions,
    Image,
    Pressable,
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
    IconButton,
    ThemedText,
} from '../components'
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
                flex: 1,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                paddingHorizontal: 7,
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
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 1,
                height: 30,
            }}
        >
            <View
                style={{
                    width: 28,
                    height: 28,
                    marginRight: 5,
                    borderRadius: 14,
                    overflow: 'hidden',
                }}
            >
                <Image
                    source={getSource()}
                    style={{
                        width: 28,
                        height: 28,
                        resizeMode: 'center',
                    }}
                    // onLoadStart={() => setLoading(true)}
                    // onLoadEnd={() => setLoading(false)}
                />
            </View>
    
            <ThemedText
                style={{
                    fontWeight: 700,
                    lineHeight: 30,
                }}
            >
                {user.username}
            </ThemedText>
            
        </Pressable>
    )
}

export default ({ user, size, orientation }) => {
    
    const {
        cart,
        dispatch,
        isThemeDark,
        loading,
        toggleTheme,
    } = useContext(AppContext)
    
    const theme = useTheme()

    const dims = useWindowDimensions()

    const renderDims = () => {
        let showDims = false
        let showFull = false
        if ((dims.width >= 300 && dims.width < 350) || dims.width >= 400) showFull = true
        if (dims.width >= 350) showDims = true
        return (
            <ThemedText
                style={{
                    flex: 1,
                    fontSize: 14,
                }}
            >
                {showFull
                    ? orientation === 'portrait'
                        ? 'portrait'
                        : 'landscape'
                    : orientation === 'portrait'
                        ? 'P'
                        : 'L'
                }
                {showDims && ` ${dims.width}x${dims.height}`}
            </ThemedText>
        )
    }
    
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '100%',
                minWidth: 280,
                marginHorizontal: 'auto',
                height: 50,
                minHeight: 50,
                maxHeight: 50,
                paddingBottom: 10,
                // borderWidth: 1,
                // borderStyle: 'dotted',
                // borderColor: 'yellow',
            }}
        >
            <Brand onPress={toggleTheme} />

            {renderDims()}

            <IconButton
                iconName={`${isThemeDark ? 'sunny' : 'moon'}-outline`}
                onPress={toggleTheme}
                transparent
                // outline
                // textStyles={{
                //     color: theme?.colors.textDefault,
                // }}
                // styles={{ flex: 1 }}
                // padded={false}
            />

            {user && cart?.length && <CartButton />}

            {user && <UserButton user={user} />}

            {user && (
                <IconButton
                    onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'SIGNOUT' })}
                    disabled={loading}
                    iconName='close-outline'
                    textStyles={{ color: theme?.colors.textDefault }}
                    transparent
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