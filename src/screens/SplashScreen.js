import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingView, Screen } from '../components'
import { AppContext } from '../AppContext'
import { authenticate, cleanStorage } from '../Auth'
import { getOrders, getVendors, loadData } from '../Data'

export default () => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const setLoading = value => dispatch({ type: 'SET_LOADING', loading: value })

    useEffect(() => {
        if (!loading) checkStatus()
    }, [])

    useEffect(() => {
        if (user) getData()
    }, [user])

    const getData = async () => {

        setLoading('Loading Orders...')
        const orders = await getOrders(user)
        setLoading('Orders Loaded.')
        dispatch({ type: 'SET_ORDERS', orders })

        if (user.role === 'customer') {
            setLoading('Loading Vendors...')
            const vendors = await getVendors()
            setLoading('Vendors Loaded.')
            dispatch({ type: 'SET_VENDORS', vendors })
        }

        setLoading('Data Loaded.')
        dispatch({ type: 'READY' })
    }

    const checkStatus = async () => {
        
        setLoading('Checking Status...')
        
        const userToken = await AsyncStorage.getItem('userToken')
        
        if (!userToken) return dispatch({ type: 'READY' })
        
        setLoading('Verifying Token...')

        const response = await authenticate(userToken)

        if (!response) {
            console.log('could not authenticate; cleaning local storage...')
            await cleanStorage()
            return dispatch({ type: 'READY' })
        }
        
        setLoading('Customer Verified. Saving Token...')
        const { token, ...rest } = response
        
        await AsyncStorage.setItem('userToken', token)
        
        setLoading('Token Saved.')

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