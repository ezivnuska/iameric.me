import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    SignInForm,
    SignUpForm,
    SimpleLink,
} from '../components'
import { Screen } from './'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const AuthScreen = ({ navigation, ...props }) => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { lastUserId, status, user } = state

    const [formVisible, setFormVisible] = useState(false)
    const [signupVisible, setSignupVisible] = useState(false)
    const [route, setRoute] = useState(null)

    const renderNav = () => signupVisible ? (
        <SimpleLink
            labelText='Sign In'
            onPress={() => setSignupVisible(false)}
        />
    ) : (
        <SimpleLink
            labelText='Sign Up'
            onPress={() => setSignupVisible(true)}
        />
    )

    const updateStatus = text => dispatch({ type: 'SET_STATUS', status: text })

    const setUser = user => {
        updateStatus('Storing user in cookie...')
        AsyncStorage
            .setItem('userToken', user.token)
            .then(() => {
                updateStatus('User saved.')
                dispatch({ type: 'SET_USER', user })
                // navigate('private')
            })
            .catch(err => {
                updateStatus('Error storing user.')
                console.log('Erro saving user to local storage:', err)
        })
    }

    const renderForm = () => {
        // console.log('status', status)
        // if (status !== null) dispatch({ type: 'SET_STATUS', status: null })

        return signupVisible
            ? <SignUpForm updateStatus={updateStatus} setUser={setUser} />
            : <SignInForm updateStatus={updateStatus} setUser={setUser} />
    }

    const storeToken = async token => {
        console.log('Storing user token...')
        return await AsyncStorage
            .setItem('userToken', token)
            .then(() => {
                console.log('User token stored.')
                dispatch({ type: 'SET_STATUS', status: `User token stored.` })
            })
            .catch(err => {
                console.log('Error caught while storing token:', err)
                dispatch({ type: 'SET_STATUS', status: `Error caught while storing user token.` })
            })
    }

    const clearStorage = async () => {
        return await AsyncStorage.multiRemove(['userToken', 'route'])
    }

    const verifyToken = async token => {
        return await axios
            .post('/api/authenticate', { token })
            .then(async ({ data }) => {
                const { error, user } = data

                if (error) {
                    console.log('Error authenticating token', error)
                    await clearStorage()
                    return null
                }
                
                if (user) {
                    console.log(`${user.username} verified`)
                    dispatch({ type: 'SET_STATUS', status: `${user.username} verified.` })
                    await storeToken(user.token)
                    return user
                }

                // else
                console.log('no user found. clearing local storage.')
                    
               await clearStorage() 

                // setFormVisible(true)
                
                return null
            })
            .catch(err => {
                console.log('Error getting user', err)
                return null
            })
    }

    const authenticateUser = async token => {
        console.log('Authenticating token...')
        const authenticatedUser = await verifyToken(token)
        
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
            if (lastUserId || lastUserId !== user._id) {
                console.log('*** Different (or new) user ***', user, lastUserId)
                dispatch({ type: 'SET_STATUS', status: `${user.username} verified.` })
                advanceToScreen('private')
            } else advanceToScreen()
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
        
        navigate(lastRoute || 'private')
    }

    const getUserToken = async () => {
        console.log('Checking for stored token...')
        return await AsyncStorage
            .getItem('userToken')
            .then(async token => {
                console.log('Stored token found.')
                return token
            })
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

    return (
        <Screen { ...props }>
            <View style={styles.container}>
                {formVisible ? renderForm() : null}
                {formVisible ? renderNav() : null}
            </View>
        </Screen>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {

    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
    },
})

