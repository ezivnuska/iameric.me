import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Screen } from '.'
import {
    SignInForm,
    SignUpForm,
} from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'
const API_PATH = '/api'
// const API_PATH = process.env.API_PATH || '/api'

const AuthScreen = ({ navigation, ...props }) => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state

    const [formVisible, setFormVisible] = useState(false)
    const [signupVisible, setSignupVisible] = useState(false)

    const renderNav = () => signupVisible ? (
        <TouchableOpacity
            style={defaultStyles.linkContainer}
            onPress={() => setSignupVisible(false)}
        >
            <Text
                style={defaultStyles.linkText}
                accessibilityLabel='Sign In'
            >
                Sign In
            </Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            style={defaultStyles.linkContainer}
            onPress={() => setSignupVisible(true)}
        >
            <Text
                style={defaultStyles.linkText}
                accessibilityLabel='Sign Up'
            >
                Sign Up
            </Text>
        </TouchableOpacity>
    )

    const renderForm = () => (
        <View>
            {signupVisible ? <SignUpForm /> : <SignInForm />}
            {renderNav()}
        </View>
    )

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
            .post(`${API_PATH}/authenticate`, { token })
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
        console.log('returning authenticatedUser', authenticatedUser)
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
                {formVisible ? renderForm() : <Text style={styles.loadingText}>Verifying user...</Text>}
            </View>
        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // flex: 1,
    //   backgroundColor: 'black',
    //   alignItems: 'center', 
    //   justifyContent: 'center',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
    },
})

