import React, { useContext, useEffect, useState } from 'react'
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    IconButton,
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

    const theme = useTheme()

    const {
        dims,
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const [showSignUpModal, setShowSignUpModal] = useState(null)
    const [showSignInModal, setShowSignInModal] = useState(null)

    useEffect(() => {
        initialize(dispatch)
    }, [])
    
    useEffect(() => {
        if (!loading) validateUser()
    }, [loading])

    const validateUser = async () => {
        if (user) navigation.navigate('Private')
    }

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

        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const onModalClosed = response => {
        
        setUser(response)

        if (showSignUpModal) setShowSignUpModal(null)
        if (showSignInModal) setShowSignInModal(null)
    }

    return (
        <Screen secure={false}>
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
                        <IconButton
                            type='primary'
                            label='Sign Up to Order!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setShowSignUpModal('customer')}
                            alignIcon='right'
                        />
                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('customer')}
                            alignIcon='right'
                            transparent
                        />
                    </View>
                </BackgroundImageWithGradient>

                <BackgroundImageWithGradient
                    caption='Selling?'
                    imageSource={`${IMAGE_PATH}/vendor-avatar.png`}
                >
                    <View style={styles.controls}>
                        <IconButton
                            type='primary'
                            label='Join as Merchant!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setShowSignUpModal('vendor')}
                            alignIcon='right'
                        />
                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('vendor')}
                            alignIcon='right'
                            transparent
                        />
                    </View>
                </BackgroundImageWithGradient>

                <BackgroundImageWithGradient
                    caption='Driving?'
                    imageSource={`${IMAGE_PATH}/driver-avatar.png`}
                >
                    <View style={styles.controls}>
                        <IconButton
                            type='primary'
                            label='Become a Driver!'
                            iconName='arrow-forward-circle-outline'
                            onPress={() => setShowSignUpModal('driver')}
                            alignIcon='right'
                        />
                        
                        <IconButton
                            label='Preview'
                            iconName='eye-outline'
                            onPress={() => onConnect('driver')}
                            alignIcon='right'
                            transparent
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
                                bottom: 50,
                                left: 20,
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