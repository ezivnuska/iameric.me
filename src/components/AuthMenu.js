import React, { useContext, useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    CartButton,
    IconButton,
    PopUpModal,
    SignInForm,
} from '.'
import { signout } from '../utils/auth'
import { AppContext } from '../AppContext'
import { navigationRef } from 'src/navigators/RootNavigation'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

const UserButton = ({ onPress, user }) => {

    const theme = useTheme()
    
    const getSource = () => user.profileImage
        ? `${IMAGE_PATH}/${user.username}/${user.profileImage.filename}`
        : `${IMAGE_PATH}/avatar-default-small.png`
    
    return (
        <Pressable
            onPress={onPress}
            style={{
                flex: 1,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 'auto',
                paddingHorizontal: 7,
                // paddingVertical: 3,
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
                height: 35,
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
    
            <Text style={{
                color: theme?.colors.textDefault,
                fontWeight: 700,
                lineHeight: 35,
            }}>
                {user.username}
            </Text>
            
        </Pressable>
    )
}

export default ({ onPress }) => {

    const theme = useTheme()
    
    const {
        cart,
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignoutModal, setShowSignoutModal] = useState(false)

    const setUser = async ({
        _id,
        email,
        images,
        profileImage,
        role,
        token,
        username,
    }) => {
        dispatch({
            type: 'SET_USER',
            user: {
                _id,
                email,
                images,
                profileImage,
                role,
                token,
                username,
            },
        })
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const onModalClosed = response => {
        setUser(response)
        if (showSignInModal) setShowSignInModal(false)
    }

    const initSignout = async () => {
        await signout(dispatch, user._id)
        setShowSignoutModal(false)
        navigationRef.navigate('Start')
    }

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            marginHorizontal: 3,
        }}>

            {(user && !loading) ? (
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '100%',
                }}>
                    {cart && cart.length ? <CartButton /> : null}

                    <UserButton onPress={onPress} user={user} />

                    <IconButton
                        onPress={() => setShowSignoutModal(true)}
                        disables={loading}
                        iconName='close-outline'
                        textStyles={{ color: theme?.colors.textDefault }}
                        transparent
                    />
                </View>
            ) : (
                <IconButton
                    iconName='log-in-outline'
                    label='Sign In'
                    onPress={() => setShowSignInModal(true)}
                    disabled={loading}
                    alignIcon='right'
                    // padded={false}
                    transparent
                />
            )}

            <PopUpModal
                visible={showSignInModal}
                onRequestClose={() => setShowSignInModal(false)}
            >
                <SignInForm
                    onComplete={onModalClosed}
                />
            </PopUpModal>

            <PopUpModal
                visible={showSignoutModal}
                onRequestClose={() => setShowSignoutModal(false)}
                transparent={true}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }}
                >

                    <IconButton
                        type='primary'
                        label='Sign Out'
                        onPress={initSignout}
                        disabled={loading}
                    />
                </View>
                
            </PopUpModal>
            
        </View>
    )
}