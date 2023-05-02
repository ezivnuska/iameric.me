import React, { useEffect, useContext } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { Screen } from './'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SecureScreen = ({ children, ...props }) => {

    const { route } = props
    
    const {
        dispatch,
        state,
    } = useContext(AppContext)
    
    const { user } = state

    const resetToAuthScreen = async () => {
        dispatch({ type: 'SET_STATUS', status: 'Clearing local storage...' })
        await AsyncStorage
            .multiRemove(['route', 'userToken'], err => {
                if (err) {
                    console.log('Error clearing local storage', err)
                    dispatch({ type: 'SET_STATUS', status: 'Error clearing local storage.' })
                }
            })
            .then(() => {
                console.log('Local storage cleared.')
                dispatch({ type: 'SET_STATUS', status: 'Local storage cleared.' })
            })
            .catch(err => {
                console.log('Error clearing local storage.', err)
                dispatch({ type: 'SET_STATUS', status: 'Error clearing local storage.' })
            })
            
            console.log('Navigating to auth screen.')
            dispatch({ type: 'SET_STATUS', status: null })
            if (route !== 'auth') navigate('auth')
    }
        
    useEffect(() => {
        if (!user) {
            console.log('No verified user found. Resetting....')
            resetToAuthScreen()
        }
    }, [user])

    return (
        <Screen { ...props }>
            {user ? (
                <View style={styles.container}>
                    {children}
                </View>
            ) : null}
        </Screen>
    )
}

export default SecureScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
})