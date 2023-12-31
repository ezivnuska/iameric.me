import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    PopUpModal,
    Screen,
    SignUpForm,
    SignInForm,
} from '@components'
import { AppContext } from '../AppContext'
import { Button } from 'antd'
import { connect } from '../Data'
// import { checkRoute } from '../navigators/RootNavigation'
// import { navigate } from '../navigators/RootNavigation'
import { initialize } from '../utils/auth'

export default ({ navigation }) => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showSignInModal, setShowSignInModal] = useState(false)

    // useEffect(() => {
    //     // if (!user && !loading) initialize(dispatch)
    // }, [])

    useEffect(() => {
        start()
    }, [])

    useEffect(() => {
        if (user) {
            navigation.navigate('Secure', {
                screen: 'Tabs',
                params: {
                    screen: 'Users',
                },
            })
        }
    }, [user])

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
        // navigation.navigate('Secure', {
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
            <View style={styles.buttons}>
                <Button
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
                </Button>
                
            </View>
            <View style={styles.buttons}>
                <Button
                    type='primary'
                    onClick={() => setShowSignUpModal(true)}
                    style={styles.button}
                >
                    Sign Up
                </Button>
                <Button
                    type='primary'
                    onClick={() => setShowSignInModal(true)}
                    style={styles.button}
                >
                    Sign In
                </Button>
            </View>

            <PopUpModal
                visible={showSignUpModal}
                onRequestClose={() => setShowSignUpModal(false)}
            >
                <SignUpForm
                    onComplete={onModalClosed}
                />
            </PopUpModal>

            <PopUpModal
                visible={showSignInModal}
                onRequestClose={() => setShowSignInModal(false)}
            >
                <SignInForm
                    onComplete={onModalClosed}
                />
            </PopUpModal>
        </Screen>
    )
}

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        minWidth: 375,
        maxWidth: 375,
        paddingVertical: 20,
    },
    button: {
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        borderRadius: 12,
    },
})