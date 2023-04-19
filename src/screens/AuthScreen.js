import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    SignInForm,
    SignUpForm,
    SimpleLink,
    StatusDisplay,
} from '../components'
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

    const setUser = async user => {
        // console.log('Setting user', user)
        
        dispatch({ type: 'SET_USER', user })
        
		return await AsyncStorage
			.setItem('userToken', user.token)
			.then(() => {
				// console.log('userToken saved in local storage')
				
                return user
			})
			.catch(err => alert('Signin Error:', err))

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
        console.log(`${authenticatedUser.username} authenticated`)
        return authenticatedUser
    }

    useEffect(() => {
        if (!user) {
            setFormVisible(true)
            setSignupVisible(false)
        }
    }, [user])

    useEffect(() => {
        const checkin = async () => {
            console.log('Checking in...')
            await AsyncStorage
                .getItem('userToken')
                .then(async userToken => {
                    if (userToken) {
                        console.log('userToken found')
                        const user = await authenticateUser(userToken)
                        if (user) {
                            const u = await setUser(user)

                            AsyncStorage
                                .getItem('route')
                                .then(route => {
                                    if (!route) navigate('private')
                                    else if (route !== props.route.name) navigate(route)
                                })
                                .catch(err => console.log(err))
                        } else {
                            AsyncStorage
                                .removeItem('userToken')
                                .then(() => {
                                    setFormVisible(true)
                                })
                        }
                    } else {
                        console.log('no userToken found')
                        setFormVisible(true)
                    }
                })
        }
        checkin()
        
        return () => console.log('AuthLoadingScreen unmounting...')
    }, [])

    return (
        <View { ...props }>
            <View style={styles.container}>
                {status ? <StatusDisplay status={status} /> : null}
                {formVisible ? renderForm() : null}
                {renderNav()}
            </View>
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        width: 375,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
    },
})

