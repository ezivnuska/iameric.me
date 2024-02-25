import React, { useContext } from 'react'
import {
    useWindowDimensions,
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
                flex: 1,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                paddingHorizontal: 7,
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

    // const dims = useWindowDimensions()

    // const renderDims = () => dims.width >= 350 && !cart ? (
    //     <ThemedText
    //         style={{
    //             flex: 1,
    //             fontSize: 12,
    //             flexGrow: 1,
    //             flexShrink: 1,
    //             lineHeight: 30,
    //         }}
    //     >
    //         {dims.width}x{dims.height}
    //     </ThemedText>
    // ) : null
    
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
            // colors={isThemeDark
            //     ? [ '#222222', '#000000' ]
            //     : [ '#ffffff', '#dddddd' ]
            // }
        >
            <Brand onPress={toggleTheme} />

            {/* {renderDims()} */}

            <IconButton
                iconName={`${isThemeDark ? 'sunny' : 'moon'}-outline`}
                onPress={toggleTheme}
                transparent
                outline
                style={{ flexGrow: 0 }}
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
                    // textStyles={{ marginHorizontal: 0 }}
                />
            )}
        </View>
    )
}