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
import Icon from 'react-native-vector-icons/Ionicons'
import { SelectiveSignUpForm } from 'src/components'

const IMAGE_PATH = __DEV__ ? 'https://iameric.me/assets' : '/assets'

export default ({ navigation }) => {

    const {
        dims,
        dispatch,
        loaded,
        loading,
        user,
    } = useContext(AppContext)

    const [showSignUpModal, setShowSignUpModal] = useState(null)
    const [showSignInModal, setShowSignInModal] = useState(null)

    // useEffect(() => {
    //     start()
    // }, [])

    // const start = async () => {
    //     const verifiedUser = await initialize(dispatch)
    //     if (verifiedUser) {
    //         dispatch({ type: 'SET_USER', user: verifiedUser })
    //         // dispatch({ type: 'SET_VERIFIED', verified: true })
    //     }
    //     dispatch({ type: 'SET_LOADING', loading: null })
    // }

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
        // dispatch({ type: 'SET_VERIFIED', verified: true })
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
        if (showSignUpModal) setShowSignUpModal(null)
        if (showSignInModal) setShowSignInModal(null)
        // if (loading) dispatch({ type: 'SET_LOADING', loading: 'false' })
    }

    return (
        <Screen>
            <View style={[
                styles.buttons,
                { height: dims ? dims.window.height - 100 : '100%' },
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
                <SelectiveSignUpForm
                    role={showSignUpModal}
                    onComplete={onModalClosed}
                />
            </PopUpModal>
            
        </Screen>
    )
}

const BackgroundImageWithGradient = ({ caption, children, imageSource }) => (
    <View
        style={styles.button}
        // onPress={() => onConnect('driver')}
    >
        <ImageBackground
            style={ styles.image }
            resizeMode='cover'
            source={imageSource}
        >
            <LinearGradient
                colors={['#00000000', '#000000']}
                style={{ flex: 1, opacity: 1 }}
            >
                <Text style={[ classes.headerSecondary, styles.caption ]}>
                    {caption}        
                </Text>

                {children}

            </LinearGradient>

        </ImageBackground>

    </View>
)

const ControlButton = ({ label, onPress, iconName = null }) => (

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
                    }
                ]}
            >
                {label}
            </Text>

            {iconName && (
                <Icon
                    name={iconName}
                    size={18}
                    color='#fff'
                    style={{
                        flex: 1,
                        marginLeft: 5,
                    }}
                />
            )}

        </View>

    </Pressable>
)

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        rowGap: 10,
        overflow: 'visible',
    },
    button: {
        flex: 1,
        flexGrow: 1,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        flex: 1,
    },
    caption: {
        position: 'absolute',
        bottom: 40,
        left: 15,
        fontWeight: 700,
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        width: '100%',
        paddingHorizontal: 15,
    },
})