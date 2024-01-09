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
import { Button } from 'antd'
import { connect } from '../Data'
import { initialize } from '../utils/auth'
import classes from '../styles/classes'
import LinearGradient from 'react-native-linear-gradient'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation }) => {

    const {
        dims,
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showSignInModal, setShowSignInModal] = useState(false)

    useEffect(() => {
        start()
    }, [])

    const start = async () => {
        const verified = await initialize(dispatch)
        if (verified) {
            dispatch({ type: 'SET_USER', user: verified })
            dispatch({ type: 'SET_VERIFIED', verified: true })
        }
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const onConnect = async type => {
        
        const connectedUser = await connect(type)
        // console.log('connectedUser', connectedUser)
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
        dispatch({ type: 'SET_VERIFIED', verified: true })
        dispatch({ type: 'SET_LOADING', loading: null })
        // navigation.navigate('Private', {
        //     screen: 'Tabs',
        //     params: {
        //         screen: 'Users',
        //     },
        // })
    }

    const onModalClosed = response => {
        // console.log('closing modal, setting user', response)
        setUser(response)
        if (showSignUpModal) setShowSignUpModal(false)
        if (showSignInModal) setShowSignInModal(false)
        // if (loading) dispatch({ type: 'SET_LOADING', loading: 'false' })
    }

    return (
        <Screen>
            <View style={[
                styles.buttons,
                { height: dims ? dims.window.height - 100 : '100%' },
            ]}>
                <Pressable
                    style={styles.button}
                    onPress={() => onConnect('customer')}
                >
                    <ImageBackground
                        style={{ flex: 1 }}
                        resizeMode='cover'
                        source={`${IMAGE_PATH}/customer-avatar.png`}
                    >
                        <LinearGradient
                            colors={['#00000000', '#000000']}
                            style={{
                                flex: 1,
                                paddingLeft: 15,
                                paddingRight: 15,
                                borderRadius: 5,
                                opacity: 1,
                            }}
                        >
                        
                            <Text
                                style={[
                                    classes.textDefault,
                                    styles.buttonText
                                ]}
                            >
                                Hungry?
                            </Text>

                        </LinearGradient>

                    </ImageBackground>

                </Pressable>

                <Pressable
                    style={styles.button}
                    onPress={() => onConnect('vendor')}
                >
                    <ImageBackground
                        style={{ flex: 1 }}
                        resizeMode='cover'
                        source={`${IMAGE_PATH}/vendor-avatar.png`}
                    >
                        <LinearGradient
                            colors={['#00000000', '#000000']}
                            style={{
                                flex: 1,
                                paddingLeft: 15,
                                paddingRight: 15,
                                borderRadius: 5,
                                opacity: 1,
                            }}
                        >
                        
                            <Text
                                style={[
                                    classes.textDefault,
                                    styles.buttonText
                                ]}
                            >
                                Selling?
                            </Text>

                        </LinearGradient>
                        
                    </ImageBackground>

                </Pressable>

                <Pressable
                    style={styles.button}
                    onPress={() => onConnect('driver')}
                >
                    <ImageBackground
                        style={{ flex: 1 }}
                        resizeMode='cover'
                        source={`${IMAGE_PATH}/driver-avatar.png`}
                    >
                        <LinearGradient
                            colors={['#00000000', '#000000']}
                            style={{
                                flex: 1,
                                paddingLeft: 15,
                                paddingRight: 15,
                                borderRadius: 5,
                                opacity: 1,
                            }}
                        >
                        
                            <Text
                                style={[
                                    classes.textDefault,
                                    styles.buttonText
                                ]}
                            >
                                Driving?
                            </Text>

                        </LinearGradient>

                    </ImageBackground>

                </Pressable>
                {/* <Button
                    style={styles.button}
                    type='primary'
                    onClick={() => onConnect('customer')}
                >
                    Order
                </Button>
                <Button
                    type='primary'
                    onClick={() => onConnect('vendor')}
                    style={styles.button}
                >
                    Sell
                </Button>
                <Button
                    type='primary'
                    onClick={() => onConnect('driver')}
                    style={styles.button}
                >
                    Deliver
                </Button> */}
                
            </View>
            {/* <View>
                <Button
                    type='primary'
                    onClick={() => setShowSignUpModal(true)}
                >
                    Sign Up
                </Button>
            </View>

            <PopUpModal
                visible={showSignUpModal}
                onRequestClose={() => setShowSignUpModal(false)}
            >
                <SignUpForm
                    onComplete={onModalClosed}
                />
            </PopUpModal> */}
        </Screen>
    )
}

const styles = StyleSheet.create({
    buttons: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        // height: '100%',
        // width: '100%',
        // borderStyle: 'solid',
        // borderWidth: 2,
        // borderColor: 'yellow',
        // minWidth: 375,
        // maxWidth: 375,
        // paddingVertical: 20,
    },
    button: {
        flex: 1,
        // flexBasis: '30%',
        flexGrow: 1,
        // flexShrink: 0,
        // borderRadius: 12,
        // borderWidth: 1,
        // borderColor: '#fff',
        position: 'relative',
    },
    buttonText: {
        position: 'absolute',
        bottom: 15,
        left: 15,
    }
})