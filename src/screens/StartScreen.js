import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    ButtonPrimary,
    LoadingView,
    PanelView,
    Screen,
} from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../AppContext'
import axios from 'axios'
import layout from '../styles/layout'
import main from '../styles/main'

const StartScreen = ({ navigation }) => {

    const creds = {
        customer: {
            email: 'customer@iameric.me',
            password: 'customer',
        },
        driver: {
            email: 'driver@iameric.me',
            password: 'driver',
        },
        vendor: {
            email: 'vendor@iameric.me',
            password: 'vendor',
        },
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

        const {
            profileImage,
            role,
            username,
            _id
        } = user

        dispatch({
            type: 'SET_USER',
            user: {
                profileImage,
                role,
                username,
                _id,
                email,
            }
        })
    }

    return (
        <Screen>
            <PanelView style={{ height: '100%' }}>
                {loading
                    ? <LoadingView label='Connecting...' />
                    : (
                        <View style={styles.container}>
                            <View style={styles.experience}>
                                <Text style={[main.text, styles.caption]}>{`Create an order\nas a customer.`}</Text>
                                <ButtonPrimary
                                    label='Order Takeout'
                                    onPress={() => connect('customer')}
                                />
                            </View>
                            <View style={styles.experience}>
                                <Text style={[main.text, styles.caption]}>{`Confirm new orders,\nor add new products,\nas a vendor.`}</Text>
                                <ButtonPrimary
                                    label='Handle Prep'
                                    onPress={() => connect('vendor')}
                                />
                            </View>
                            <View style={styles.experience}>
                                <Text style={[main.text, styles.caption]}>{`Accept available orders,\nand complete them,\nas a driver.`}</Text>
                                <ButtonPrimary
                                    label='Complete Deliveries'
                                    onPress={() => connect('driver')}
                                />
                            </View>
                        </View>
                )
            }
            </PanelView>
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
        // width: '100%',
        // marginTop: 20,
        // marginHorizontal: 10,
    },
    experience: {
        // flex: 1,
        marginHorizontal: 'auto',
        paddingHorizontal: layout.horizontalPadding,
        paddingVertical: layout.verticalPadding,
        width: '75%',
        minWidth: 250,
        maxWidth: 375,
        backgroundColor: '#ddd',
        borderRadius: 12,
    },
    caption: {
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: layout.verticalMargin,
    },
})