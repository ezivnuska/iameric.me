import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    LoadingView,
    CenteredView,
    Screen,
} from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import axios from 'axios'
import { Button } from 'antd'
import layout from '../styles/layout'
import main from '../styles/main'

const StartScreen = () => {

    const creds = {
        customer: { email: 'customer@iameric.me', password: 'customer' },
        driver: { email: 'driver@iameric.me', password: 'driver' },
        vendor: { email: 'vendor@iameric.me', password: 'vendor' },
    }

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const setLoading = value => dispatch({ type: 'SET_LOADING', loading: value })
    const setStatus = value => dispatch({ type: 'SET_STATUS', status: value })

    useEffect(() => {
        if (user) getData()
    }, [user])

    const getData = async () => {
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
        console.log('Finished Loading Vendors...', data.vendors)
        
        dispatch({ type: 'SET_VENDORS', vendors: data.vendors })

        return data.vendors
    }

    const connect = async type => {

        setLoading(true)
        
        const { email, password } = creds[type]
        
        console.log(`connecting as ${type}`)
		
        const response = await axios.
            post('/api/signin', { email, password })
        
        const user = response.data
        
        if (!user) {
            console.log('error authenticating user')
            setLoading(false)
            return
        }
        
        await AsyncStorage.setItem('userToken', user.token)
        
        setStatus('User token set')
        
        console.log(`${user.username} connected`)

        setUser(user)
    }

    const setUser = ({
        _id,
        email,
        profileImage,
        role,
        username,
    }) => {
        dispatch({
            type: 'SET_USER',
            user: {
                _id,
                email,
                profileImage,
                role,
                username,
            }
        })
    }

    return (
        <Screen>
            <CenteredView style={{ height: '100%' }}>
                {loading
                    ? <LoadingView label='Connecting...' />
                    : (
                        <View style={styles.container}>
                            <View style={styles.experience}>
                                
                                <Text style={[main.text, styles.caption]}>
                                    Customer Experience
                                </Text>
                                
                                <Button type='primary' onClick={() => connect('customer')}>
                                    Order Takeout
                                </Button>

                            </View>

                            <View style={styles.experience}>
                                
                                <Text style={[main.text, styles.caption]}>
                                    Vendor Experience
                                </Text>

                                <Button type='primary' onClick={() => connect('vendor')}>
                                    Make Sales
                                </Button>
                            </View>

                            <View style={styles.experience}>
                                
                                <Text style={[main.text, styles.caption]}>
                                    Driver Experience
                                </Text>

                                <Button type='primary' onClick={() => connect('driver')}>
                                    Make Deliveries
                                </Button>
                            </View>
                        </View>
                )
            }
            </CenteredView>
        </Screen>
    )
}

export default StartScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        height: '100%',
        // width: 250,
        // marginTop: 20,
        marginHorizontal: 'auto',
    },
    experience: {
        // flex: 1,
        marginHorizontal: 'auto',
        paddingHorizontal: layout.horizontalPadding,
        paddingVertical: layout.verticalPadding,
        width: 200,
        minWidth: 300,
        maxWidth: 400,
        backgroundColor: '#ddd',
        borderRadius: 12,
    },
    caption: {
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: layout.verticalMargin,
    },
})