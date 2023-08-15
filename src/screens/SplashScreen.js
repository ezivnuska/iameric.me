import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import { authenticate } from '../Auth'

const SplashScreen = ({ navigation }) => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { isLoading } = state

    const setLoading = loading => dispatch({ type: 'SET_LOADING', loading })

    useEffect(() => {
        checkStatus()
    }, [])

    const checkStatus = async () => {
        
        console.log('\nS P L A S H\n\nchecking auth status\n\n')
        
        const userToken = await AsyncStorage.getItem('userToken')
        
        if (!userToken) {
            setLoading(false)
            console.log('no token found')
            return
        }

        console.log('verifying saved token')
        const response = await authenticate(userToken)
        
        if (!response) {
            console.log('invalid token')
            setLoading(false)
            return
        }
        
        const { token, ...user } = response
        
        await AsyncStorage.setItem('userToken', token)
        
        dispatch({
            type: 'SET_USER',
            user,
        })

        setLoading(false)

        const route = await AsyncStorage.getItem('route')
        const detail = await AsyncStorage.getItem('detail')
        if (!route) return

        navigate(route, { id: detail })
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.splash}>Splash</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {

    },
})