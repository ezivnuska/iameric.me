import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'
import {
    Validation,
    LoginMenu,
    Screen,
} from '../components'
import { authenticate, cleanStorage } from '../Auth'
import { navigate } from '../navigators/RootNavigation'
import axios from 'axios'
import { AppContext } from '../AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import main from '../styles/main'

const HomeScreen = ({ navigation }) => {

    const {
        dispatch,
        loaded,
        loading,
        state,
        status,
        user,
    } = useContext(AppContext)

    const [isValid, setIsValid] = useState(false)

    const setLoading = value => dispatch({ type: 'SET_LOADING', loading: value })
    const setStatus = value => dispatch({ type: 'SET_STATUS', status: value })
    
    useEffect(() => {
        console.log('hello')
        checkForToken()
        if (user && !loading && !loaded) getData()
    }, [])
    
    const checkForToken = async () => {
        console.log('Checking for token...')
        const token = await AsyncStorage.getItem('userToken')
        console.log('token', token)
        if (token) checkStatus(token)
        else setLoading(false)
    }

    const checkStatus = async userToken => {
        
        setStatus('Verifying Token...')
        console.log('Verifying Token...', userToken)
        
        setLoading(true)

        const response = await authenticate(userToken)

        if (!response) {
            console.log('could not authenticate previous user')
            await cleanStorage()
            setLoading(false)
            navigate('Start')
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
        console.log('user changed', user)
        if (!user) return
        getData()
    }, [user])

    const getData = async () => {
        console.log('gettingData: loading, loaded', loading, loaded)
        // setLoading(true)
        await getOrders()
        await getVendors()
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
        console.log('loaded', loaded ? 'TRUE' : 'FALSE')
        if (loaded) {
            console.log('data loaded')
            if (user) {
                console.log('advancing user')
                advance()
            }
        }
    }, [loaded])

    const advance = async () => {
        console.log('ADVANCING')
        const route = await AsyncStorage.getItem('route')
        const detail = await AsyncStorage.getItem('detail')
        
        if (!route) {
            console.log('navigating home')
            navigate('Home')
            return
        }
        
        console.log('detail', detail, typeof detail)
        const details = detail ? ({ id: detail }) : null
        if (details) console.log('details', details)
        
        console.log('navigating to route', route, details)
        navigate(route, details)
    }

    const renderScreen = () => {
        console.log('loaded, user', loaded, user)
        if (!loaded || !user) return 
        else return <Validation />
    }
    
    return (
        <Screen>
            <LoginMenu />
        </Screen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: StatusBar.currentHeight,
        // borderWidth: 5,
        // borderColor: 'pink',
    },
    modules: {
        flex: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    aside: {
        flex: 1,        
    },
})