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
import defaultStyles from '../styles/main'

const AuthScreen = ({ navigation, ...props }) => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state

    const [formVisible, setFormVisible] = useState(false)
    const [signupVisible, setSignupVisible] = useState(false)

    const setUser = async user => {
        if (!user) console.log('Error storing user')
        await AsyncStorage.setItem('userToken', user.token)
        dispatch({ type: 'SET_USER', user })
    }

    useEffect(() => {
        checkIn()
    }, [])

    useEffect(() => {
        if (user) {
            dispatch({ type: 'SET_STATUS', status: `${user.username} verified.` })
            advanceToScreen()
        } else {
            setFormVisible(true)
            setSignupVisible(false)
        }
    }, [user])

    const advanceToScreen = async () => {
        const lastRoute = await AsyncStorage.
            getItem('route')
        
        if (lastRoute) {
            console.log('advancing to last route', lastRoute)
            navigate(lastRoute)
        }
    }

    const getUserToken = async () => {
        const token = await AsyncStorage.
            getItem('userToken')

        if (!token) {
            console.log('Caught Error checking for stored token.')
            return null
        }

        return token
    }

    const checkIn = async () => {
        console.log('Checking in...')
        
        const token = await getUserToken()

        if (!token) {
            console.log('no user token found')
            setFormVisible(true)
            return
        }

        setFormVisible(false)

        const authenticatedUser = await authenticate(token)
        
        if (!authenticatedUser) {
            console.log('no authenticated user found')
            setFormVisible(true)
            return
        }

        await AsyncStorage
            .setItem('userToken', authenticatedUser.token)
            .then(() => dispatch({ type: 'SET_USER', user: authenticatedUser }))
            .catch(err => console.log('Signin Error:', err))
    }

    return (
        <View
            // style={{ flex: 1 }}
        >
            
            {signupVisible
                ? <SignUpForm setUser={setUser} />
                : <SignInForm setUser={setUser} />
            }

            <View style={defaultStyles.formContainer}>
                <AuthButton
                    signin={!!signupVisible}
                    onPress={() => setSignupVisible(!signupVisible)}
                />
                <GuestSigninButton setUser={setUser} />
            </View>
        </View>
    )
}

export default AuthScreen

