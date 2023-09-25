import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import { authenticate, cleanStorage } from '../Auth'
import {
    LoadingView,
    Screen,
} from '../components'
import axios from 'axios'

const SplashScreen = ({ navigation }) => {

    const {
        dispatch,
        state,
        loaded,
        loading,
        orders,
        status,
        user,
        vendors,
    } = useContext(AppContext)

    // const [status, setStatus] = useState('...')

    const setLoading = value => dispatch({ type: 'SET_LOADING', loading: value })
    // const setLoaded = () => dispatch({ type: 'DATA_LOADED' })
    const setStatus = value => dispatch({ type: 'SET_STATUS', status: value })

    useEffect(() => {
        console.log('SPLASH')
        if (!loading) checkStatus()
    }, [])

    const checkStatus = async () => {
        
        console.log('\nS P L A S H\n\nchecking auth status\n\n')
        
        setStatus('Checking Status...')
        console.log('Checking Status...')
        
        const userToken = await AsyncStorage.getItem('userToken')
        
        if (!userToken) {
            dispatch({ type: 'DATA_LOADED' })
            return
        }
        
        setStatus('Verifying Token...')
        console.log('Verifying Token...')
        
        setLoading(true)

        const response = await authenticate(userToken)

        if (!response) {
            console.log('could not authenticate previous user')
            await cleanStorage()
            setLoading(false)
            // navigate('Start')
            return
        }

        setStatus('Token Verified...')
        console.log('Token Verified...')
        
        const { token, ...rest } = response
        
        await AsyncStorage.setItem('userToken', token)

        setStatus('Setting User...')
        
        dispatch({
            type: 'SET_USER',
            user: rest,
        })
        
        return rest
    }

    useEffect(() => {
        if (user) getData()
    }, [user])

    const getData = async () => {
        await getOrders()
        await getVendors()
        // setLoaded(true)
        setLoading(false)
    }

    const getOrders = async () => {
        
        setStatus('Loading Orders...')
        console.log('Loading Orders...')

        const url = () => {
            switch (user.role) {
                case 'customer':
                case 'vendor': return `/api/orders/${user._id}`
                case 'driver': return  `/api/orders`
            }
        }
        
        const { data } = await axios.get(url())
        
        if (!data) {
            console.log('could not get user orders')
            return null
        }

        setStatus('Finished Loading Orders...')
        console.log('Finished Loading Orders...')
        
        dispatch({ type: 'SET_ORDERS', orders: data })

        return data
    }
    
    const getVendors = async () => {
        setStatus('Loading Vendors...')
        console.log('Loading Vendors...')
        
        const { data } = await axios.
            get('/api/vendors')

        if (!data) {
            console.log('Error: could not get vendors')
            return null
        }

        setStatus('Finished Loading Vendors...')
        console.log('Finished Loading Vendors...')
        
        dispatch({ type: 'SET_VENDORS', vendors: data.vendors })

        return data.vendors
    }
    
    useEffect(() => {
        if (loaded) {
            console.log('data loaded')
            // if (user) advance()
        }
    }, [loaded])

    const advance = async () => {

        const route = await AsyncStorage.getItem('route')
        const detail = await AsyncStorage.getItem('detail')
        
        if (!route) {
            console.log(user, loaded)
            console.log('no route saved. navigating to dashboard.')
            navigate('Home')
            return
        }

        const details = detail ? { id: detail } : null

        navigate(route, details)
    }
    
    return (
        <Screen>
            <LoadingView label={status} />
        </Screen>
    )
}

export default SplashScreen