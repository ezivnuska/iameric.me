import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingView, Screen } from '../components'
import { AppContext } from '../AppContext'
import { authenticate, cleanStorage } from '../Auth'
import axios from 'axios'
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
        if (user) {
            onReady()
        }
    }, [user])

    const onReady = async () => {
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

        setLoading(null)
        
        return rest
    }

    // useEffect(() => {
    //     if (user) {
    //         console.log('user', user)
    //         getData()
    //     }
    // }, [user])

    // const getData = async () => {
        
    //     setLoading('getting data...')
        
    //     await getOrders()
    //     await getVendors()
        
    //     setLoading(null)
    // }

    // const getOrders = async () => {
        
    //     setLoading('Loading Orders...')

    //     const url = () => {
    //         switch (user.role) {
    //             case 'customer':
    //             case 'vendor': return `/api/orders/${user._id}`
    //             case 'driver': return  `/api/orders`
    //         }
    //     }
        
    //     const { data } = await axios.get(url())
        
    //     if (!data) return console.log('could not get user orders')

    //     setLoading(null)
        
    //     dispatch({ type: 'SET_ORDERS', orders: data })

    //     return data
    // }
    
    // const getVendors = async () => {

    //     setLoading('Loading Vendors...')
        
    //     const { data } = await axios.
    //         get('/api/vendors')

    //     if (!data) return console.log('Error: could not get vendors')

    //     dispatch({ type: 'SET_VENDORS', vendors: data.vendors })
        
    //     setLoading(null)

    //     return data.vendors
    // }

    // const advance = async () => {

    //     const route = await AsyncStorage.getItem('route')
    //     const detail = await AsyncStorage.getItem('detail')
        
    //     if (!route) {
    //         console.log(user, loaded)
    //         console.log('no route saved. navigating to dashboard.')
    //         navigate('Home')
    //         return
    //     }

    //     const details = detail ? { id: detail } : null

    //     navigate(route, details)
    // }
    
    return (
        <Screen>
            <LoadingView label={loading} />
        </Screen>
    )
}