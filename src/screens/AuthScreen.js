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

    const { status, user } = state

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

    const renderForm = () => {
        // console.log('status', status)
        // if (status !== null) dispatch({ type: 'SET_STATUS', status: null })

        return signupVisible
            ? <SignUpForm updateStatus={updateStatus} />
            : <SignInForm updateStatus={updateStatus} />
    }

    const authenticateUser = async token => {
        console.log('Authenticating token...')
        const authenticatedUser = await axios
            .post('/api/authenticate', { token })
            .then(async ({ data }) => {
                const { error, user } = data

                if (error) {
                    console.log('Error authenticating token', error)
                    await AsyncStorage.removeItem('userToken')
                    return null
                }
                
                if (user) {
                    console.log('authenticated user found', user.username)
                    return user
                }

                // else
                console.log('no user found. clearing local storage.')
                    
                await AsyncStorage.multiRemove(['userToken', 'route'])

                setFormVisible(true)
                
                return null
            })
            .catch(err => {
                console.log('Error getting user', err)
                return null
            })
        
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
        if (!user) {
            setFormVisible(true)
            setSignupVisible(false)
        } else {
            dispatch({ type: 'SET_STATUS', status: `${user.username} verified.` })
            advanceToScreen()
        }
    }, [user])

    // useEffect(() => {
    //     if (route) console.log('route changed', route)
    //     // checkin()
    // }, [route])

    const advanceToScreen = async () => {
        console.log('Checking for saved location...')
        const lastRoute = await AsyncStorage
            .getItem('route')
            .then(route => {
                if (!route) {
                    console.log('No previous location saved.')
                    return null
                } else {
                    // dispatch({ type: 'SET_STATUS', status: null })
                    return route
                }
            })
            .catch(err => {
                console.log('Error checking for previously saved location.', err)
                return null
            })
            
        if (lastRoute) {
            console.log('navigating to', lastRoute)
            navigate(lastRoute)
        }
    }

    const checkIn = async () => {
        console.log('Checking in...')
        await AsyncStorage
            .getItem('userToken')
            .then(async userToken => {
                if (userToken) {
                    console.log('userToken found')
                    dispatch({ type: 'SET_STATUS', status: 'Verifying token...' })
                    const authenticatedUser = await authenticateUser(userToken)
                    // console.log(`authenticatedUser: ${authenticatedUser}`)
                    if (authenticatedUser) {
                        console.log(`${authenticatedUser.username} authenticated`)
                        dispatch({ type: 'SET_STATUS', status: `${authenticatedUser.username} authenticated` })
                        await AsyncStorage
                            .setItem('userToken', authenticatedUser.token)
                            .then(() => {
                                // console.log('userToken saved in local storage')
                                dispatch({ type: 'SET_USER', user: authenticatedUser })
                                dispatch({ type: 'SET_STATUS', status: 'Token stored.' })
                            })
                            .catch(err => alert('Signin Error:', err))
                        
                        dispatch({ type: 'SET_STATUS', status: 'Token verified.' })
                    } else {
                        dispatch({ type: 'SET_STATUS', status: 'Authentication failed. Please sign in.' })
                        setFormVisible(true)
                    }
                } else {
                    dispatch({ type: 'SET_STATUS', status: null })
                    console.log('no user token found')
                    setFormVisible(true)
                }
            })
    }

    return (
        <Screen { ...props }>
            <View style={styles.container}>
                {formVisible ? renderForm() : null}
                {renderNav()}
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

