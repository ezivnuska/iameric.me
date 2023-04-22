import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    ScreenContent,
    SignInForm,
    SignUpForm,
    SimpleLink,
    StatusDisplay,
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

    const { user } = state

    const [formVisible, setFormVisible] = useState(false)
    const [signupVisible, setSignupVisible] = useState(false)
    const [status, setStatus] = useState(null)
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

    const updateStatus = text => setStatus(text)

    const renderForm = () => {
        if (status) setStatus(null)

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
        if (!user) {
            setFormVisible(true)
            setSignupVisible(false)
        } else {
            setStatus(`${user.username} verified.`)
            // console.log('User verified.', user)
            if (route) navigate(route)
        }
    }, [user])

    useEffect(() => {
        console.log('route changed', route)
        checkin()
    }, [route])

    const getRoute = async () => {
        setStatus('Checking for last route...')
        await AsyncStorage
            .getItem('route')
            .then(route => {
                if (!route) {
                    setStatus('no route found.')
                    console.log('no route found.')
                    console.log('navigating to auth.')
                    navigate('auth')
                }
                else {
                    console.log('navigating to', route)
                    navigate(route)
                }
                // console.log('props.route.name', props.route.name)
            })
            .catch(err => {
                setStatus('Error finding last route.')
                console.log(err)
            })
    }

    useEffect(() => {
        getRoute()
        
        return () => console.log('AuthLoadingScreen unmounting...')
    }, [])

    const checkin = async () => {
        console.log('Checking in...')
        await AsyncStorage
            .getItem('userToken')
            .then(async userToken => {
                if (userToken) {
                    console.log('userToken found')
                    setStatus('Verifying token...')
                    const authenticatedUser = await authenticateUser(userToken)
                    // console.log(`authenticatedUser: ${authenticatedUser}`)
                    if (authenticatedUser) {
                        console.log(`${authenticatedUser.username} authenticated`)
                        setStatus('Storing token.')
                        await AsyncStorage
                        .setItem('userToken', authenticatedUser.token)
                        .then(() => {
                            // console.log('userToken saved in local storage')
                            dispatch({ type: 'SET_USER', user: authenticatedUser })
                            setStatus('Ttoken stored.')
                        })
                        .catch(err => alert('Signin Error:', err))
                        
                        setStatus('Token verified.')
                    } else {
                        setStatus('Clearing token...')
                        AsyncStorage
                            .removeItem('userToken')
                            .then(() => {
                                setStatus('Token cleared.')
                                setFormVisible(true)
                            })
                            .catch(err => {
                                setStatus('Error clearing token.')
                                console.log('Error clearing token', err)
                            })
                    }
                } else {
                    setStatus('No token found.')
                    console.log('no userToken found')
                    setFormVisible(true)
                }
            })
    }

    return (
        <Screen { ...props }>
            <ScreenContent>
                <View style={styles.container}>
                    {status ? <StatusDisplay status={status} /> : null}
                    {formVisible ? renderForm() : null}
                    {renderNav()}
                </View>
            </ScreenContent>
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

