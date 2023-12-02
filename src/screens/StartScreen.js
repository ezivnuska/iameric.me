import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    ModalContent,
    Screen,
    SignUpForm,
    SignInForm,
} from '@components'
import { AppContext } from '../AppContext'
import { Button } from 'antd'
import { connect } from '../Data'
import { checkRoute } from '../navigators/RootNavigation'

export default () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showSignInModal, setShowSignInModal] = useState(false)

    useEffect(() => {
        if (user) checkRoute()
    }, [user])

    const onConnect = async type => {

        dispatch({ type: 'SET_LOADING', loading: 'connecting' })
        
        const connectedUser = await connect(type)
        
        dispatch({ type: 'SET_LOADING', loading: null })

        if (connectedUser) setUser(connectedUser)
        else console.log(`Error connecting as ${type}.`)
        
    }

    const setUser = ({
        _id,
        email,
        images,
        profileImage,
        role,
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
                username,
            }
        })
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

            <ModalContent
                visible={showSignUpModal}
                onRequestClose={() => setShowSignUpModal(false)}
                label='Sign Up'
            >
                <SignUpForm
                    setUser={setUser}
                />
            </ModalContent>

            <ModalContent
                visible={showSignInModal}
                onRequestClose={() => setShowSignInModal(false)}
                label='Sign In'
            >
                <SignInForm
                    setUser={setUser}
                    onComplete={() => setShowSignInModal(false)}
                />
            </ModalContent>
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