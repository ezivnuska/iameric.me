import React, { useContext, useEffect, useState } from 'react'
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    PopUpModal,
    Screen,
    SignUpForm,
} from '@components'
import { AppContext } from '../AppContext'
import { connect, initialize } from '../utils/auth'
import classes from '../styles/classes'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation }) => {

    const {
        dims,
        dispatch,
        loaded,
        // loading,
        user,
    } = useContext(AppContext)

    const [showSignUpModal, setShowSignUpModal] = useState(null)
    const [showSignInModal, setShowSignInModal] = useState(null)

    useEffect(() => {
        if (!loaded) {
            start()
        }
    }, [])
    
    const start = async () => {
        console.log('initializing...')
        await initialize(dispatch)
        console.log('initialized.')
    }

    useEffect(() => {
        if (loaded && user) {
            navigation.navigate('Private')
        }
    }, [user, loaded])

    const onConnect = async type => {
        
        const connectedUser = await connect(type)
        
        if (!connectedUser) {
            console.log('Error: Could not connect user.')
            return
        } else {
            setUser(connectedUser)
            return
        }
    }

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
        dispatch({ type: 'SET_LOADED', loaded: true })
        dispatch({ type: 'SET_LOADING', loading: null })
        // navigation.navigate('Private', {
        //     screen: 'Tabs',
        //     params: {
        //         screen: 'Users',
        //     },
        // })
    }

    const onModalClosed = response => {
        
        setUser(response)

        if (showSignUpModal) setShowSignUpModal(null)
        if (showSignInModal) setShowSignInModal(null)
    }

    return (
        <Screen>
            <View style={[
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'stretch',
                    rowGap: 10,
                    overflow: 'visible',
                    height: dims ? dims.window.height - 100 : '100%',
                },
            ]}>

                <BackgroundImageWithGradient
                    caption='Hungry?'
                    imageSource={`${IMAGE_PATH}/customer-avatar.png`}
                >
                    <View style={styles.controls}>
                        <ControlButton
                            label='Sign Up to Order!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setShowSignUpModal('customer')}
                        />
                        <ControlButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('customer')}
                        />
                    </View>
                </BackgroundImageWithGradient>

                <BackgroundImageWithGradient
                    caption='Selling?'
                    imageSource={`${IMAGE_PATH}/vendor-avatar.png`}
                >
                    <View style={styles.controls}>
                        <ControlButton
                            label='Join as Merchant!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setShowSignUpModal('vendor')}
                        />
                        <ControlButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('vendor')}
                        />
                    </View>
                </BackgroundImageWithGradient>

                <BackgroundImageWithGradient
                    caption='Driving?'
                    imageSource={`${IMAGE_PATH}/driver-avatar.png`}
                >
                    <View style={styles.controls}>
                        <ControlButton
                            label='Become a Driver!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setShowSignUpModal('driver')}
                        />
                        <ControlButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('driver')}
                        />
                    </View>
                </BackgroundImageWithGradient>

            </View>

            <PopUpModal
                visible={showSignUpModal}
                onRequestClose={() => setShowSignUpModal(false)}
            >
                <SignUpForm
                    role={showSignUpModal}
                    onComplete={onModalClosed}
                />
            </PopUpModal>
            
        </Screen>
    )
}

const BackgroundImageWithGradient = ({ caption, children, imageSource }) => {
    
    const theme = useTheme()

    return (
        <View
            style={{
                flex: 1,
                flexGrow: 1,
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <ImageBackground
                style={{ flex: 1 }}
                resizeMode='cover'
                source={imageSource}
            >
                <LinearGradient
                    style={{ flex: 1, opacity: 1 }}
                    colors={theme?.dark
                        ? [ '#00000000', '#000000' ]
                        : [ '#ffffff00', '#ffffff' ]
                    }
                >
                    <Text
                        style={[
                            classes.headerSecondary,
                            {
                                position: 'absolute',
                                bottom: 30,
                                left: 15,
                                fontWeight: 700,
                                color: theme?.colors.textDefault,
                            },
                        ]}
                    >
                        {caption}        
                    </Text>

                    {children}

                </LinearGradient>

            </ImageBackground>

        </View>
    )
}

const ControlButton = ({ label, onPress, iconName = null }) => {
    
    const theme = useTheme()

    return (
        <Pressable
            onPress={onPress}
            style={{
                flexBasis: 'auto',
                flexGrow: 0,
                flexShrink: 1,
            }}
        >
                                            
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <Text
                    style={[
                        classes.buttonText,
                        {
                            flexBasis: 'auto',
                            flexGrow: 1,
                            flexShrink: 0,
                            color: theme?.colors.textDefault,
                        }
                    ]}
                >
                    {label}
                </Text>

                {iconName && (
                    <Icon
                        name={iconName}
                        size={18}
                        color={theme?.colors.textDefault}
                        style={{
                            flex: 1,
                            marginLeft: 5,
                        }}
                    />
                )}

            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
})