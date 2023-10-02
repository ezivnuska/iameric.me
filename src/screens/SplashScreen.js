import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingView, Screen } from '../components'
import { AppContext } from '../AppContext'
import { authenticate, cleanStorage } from '../Auth'
import { loadData } from '../Data'

export default () => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const setLoading = value => dispatch({ type: 'SET_LOADING', loading: value })

    useEffect(() => {
        checkStatus()
    }, [])

    useEffect(() => {
        if (user) getData()
    }, [user])

    const getData = async () => {
        const { orders, vendors } = await loadData(user)
        dispatch({ type: 'SET_ORDERS', orders })
        dispatch({ type: 'SET_VENDORS', vendors })
        dispatch({ type: 'DATA_LOADED' })
    }

    const checkStatus = async () => {
        
        setLoading('Checking Status...')
        
        const userToken = await AsyncStorage.getItem('userToken')
        
        if (!userToken) return dispatch({ type: 'DATA_LOADED' })
        
        setLoading('Verifying Token...')

        const response = await authenticate(userToken)

        if (!response) {
            console.log('could not authenticate; cleaning local storage...')
            await cleanStorage()
            setLoading(null)
            return
        }
        
        const { token, ...rest } = response
        
        await AsyncStorage.setItem('userToken', token)
        
        dispatch({
            type: 'SET_USER',
            user: rest,
        })
        
        return rest
    }
    
    return (
        <Screen>
            <LoadingView label={loading} />
        </Screen>
    )
}