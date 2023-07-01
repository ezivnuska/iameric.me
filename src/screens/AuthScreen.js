import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    AuthButton,
    GuestSigninButton,
    Screen,
    SignInForm,
    SignUpForm,
} from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import { authenticate } from '../Auth'

const AuthScreen = ({ navigation, ...props }) => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state

    const [formVisible, setFormVisible] = useState(false)
    const [signupVisible, setSignupVisible] = useState(false)

    const setUser = user => {
        if (!user) console.log('Error storing user')
        AsyncStorage
            .setItem('userToken', user.token)
            .then(() => dispatch({ type: 'SET_USER', user }))
            .catch(err => console.log('Error saving user to local storage:', err))
    }

    const authenticateUser = async token => {
        console.log('Authenticating token...')
        const authenticatedUser = await authenticate()
        
        if (!authenticatedUser) {
            console.log('no authenticated user found')
            return null
        }

        return authenticatedUser
    }

    useEffect(() => {
        checkIn()
        return () => console.log('AuthLoadingScreen unmounting...')
    }, [])

    useEffect(() => {
        if (user) {
            dispatch({ type: 'SET_STATUS', status: `${user.username} verified.` })
            advanceToScreen('home')
        } else {
            setFormVisible(true)
            setSignupVisible(false)
        }
    }, [user])

    const getLastRoute = async () => {
        console.log('Checking for saved location...')
        return await AsyncStorage
            .getItem('route')
            .then(route => {
                if (route) console.log('Previous location found.', route)
                return route
            })
            .catch(err => {
                console.log('Error checking for previously saved location.', err)
                return null
            })
    }

    const advanceToScreen = async () => {
        const lastRoute = await getLastRoute()
        console.log('advance to screen', lastRoute)
        
        navigate(lastRoute || user ? 'home' : 'auth')
    }

    const getUserToken = async () => {
        console.log('Checking for stored token...')
        return await AsyncStorage
            .getItem('userToken')
            .then(token => token)
            .catch(err => {
                console.log('Caught Error checking for stored token.', err)
                return null
            })
    }

    const checkIn = async () => {
        console.log('Checking in...')
        
        const userToken = await getUserToken()

        if (!userToken) {
            dispatch({ type: 'SET_STATUS', status: null })
            console.log('no user token found')
            setFormVisible(true)
            return
        }

        dispatch({ type: 'SET_STATUS', status: 'Verifying user...' })
        setFormVisible(false)

        const authenticatedUser = await authenticateUser(userToken)
        // console.log(`authenticatedUser: ${authenticatedUser}`)
        if (authenticatedUser) {
            await AsyncStorage
                .setItem('userToken', authenticatedUser.token)
                .then(() => {
                    dispatch({ type: 'SET_USER', user: authenticatedUser })
                })
                .catch(err => console.log('Signin Error:', err))
            // advanceToScreen()
        } else {
            dispatch({ type: 'SET_STATUS', status: 'Authentication failed. Please sign in.' })
            setFormVisible(true)
        }

    }

    const renderForm = () => {
        return signupVisible
            ? <SignUpForm setUser={setUser}>{renderButtons()}</SignUpForm>
            : <SignInForm setUser={setUser}>{renderButtons()}</SignInForm>
    }

    return (
        <View>
            {signupVisible
                ? <SignUpForm setUser={setUser} />
                : <SignInForm setUser={setUser} />}
            <AuthButton
                signin={!!signupVisible}
                onPress={() => setSignupVisible(!signupVisible)}
            />
            <GuestSigninButton setUser={setUser} />
        </View>
    )
}

export default AuthScreen

