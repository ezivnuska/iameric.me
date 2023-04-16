import React, { useContext, useEffect, useSyncExternalStore } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Screen } from './'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
// const API_PATH = process.env.API_PATH || '/api'
const API_PATH = '/api'

const CheckInScreen = props => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)

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
        // console.log('Token found. authenticating...')
        return await axios
            .post('/api/authenticate', { token })
            .then(async ({ data }) => {
                const { user } = data
                
                if (user) {
                    // console.log('authenticated user returned', user)
                    return user
                }

                // else
                // console.log('no user found. clearing local storage.')
                    
                await AsyncStorage.removeItem('token')
                await AsyncStorage.removeItem('route')
                
                return null
            })
            .catch(err => {
                console.log('Error getting user', err)
            })
    }

    useEffect(async () => {
        console.log('Checking in...')
        const userToken = await AsyncStorage.getItem('userToken')
        if (userToken) {
            const user = await authenticateUser(userToken)
            if (user) {
                await setUser(user)
                // navigate to last route viewed
                // console.log('checking storage for last route')
                AsyncStorage
                    .getItem('route')
                    .then(route => {
                        // console.log('found last route', route)
                        navigate(route || 'private')
                    })
                    .catch(err => console.log(err))
            } else {
                navigate('auth')
            }
        } else {
            // dispatch({ type: 'SET_LOADING', loading: false })
            // const route = await AsyncStorage.getItem('route') || 'Public'
            navigate('auth')// TODO: add public home screen
        }
        return () => console.log('AuthLoadingScreen unmounting...')
    }, [])

    return (
        <View { ...props }>
            <View style={styles.container}>
                <Text style={styles.loadingText}>Verifying user...</Text>
            </View>
        </View>
    )
}

export default CheckInScreen

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

