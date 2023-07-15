import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'
import {
    Customer,
    Driver,
    Module,
    UserList,
    UserProfile,
    Vendor,
} from '../components'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const VendorScreen = ({ navigation }) => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { users } = state

    const [loading, setLoading] = useState(false)
    const [customers, setCustomers] = useState(null)
    const [drivers, setDrivers] = useState(null)
    const [vendors, setVendors] = useState(null)
    const [feature, setFeature] = useState(null)

    const getUsers = () => {
        console.log('Loading users...')
        dispatch({ type: 'SET_STATUS', status: 'Loading users...' })
        setLoading(true)

        axios
            .get('/api/users')
            .then(({ data }) => {
                console.log('Users loaded.')
                setLoading(false)
                dispatch({ type: 'SET_STATUS', status: 'Users loaded.' })
                dispatch({ type: 'SET_USERS', users: data.users })
            })
            .catch(err => {
                dispatch({ type: 'SET_STATUS', status: 'Error loading users.' })
                console.log('Error getting users', err)
            }) 
    }

    useEffect(() => {
        getUsers()
    }, [])

    const getUsersByType = type => users.filter(user => user.role === type)
    const getUserById = id => users.filter(user => user._id === id)[0]

    useEffect(() => {
        if (users) {
            setCustomers(getUsersByType('customer'))
            setVendors(getUsersByType('vendor'))
            setDrivers(getUsersByType('driver'))
        }
    }, [users])

    const onItemPressed = id => {
        setFeature(getUserById(id))
    }
    
    return (
        <View style={styles.container}>
            {loading
                ? <ActivityIndicator size='small' />
                : (
                    <View style={styles.modules}>
                        <Module title='Vendors'>
                            <Vendor itemPressed={onItemPressed} users={vendors} />
                        </Module>
                    </View>
                )
            }
        </View>
    )
}

export default VendorScreen

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