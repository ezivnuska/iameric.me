import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'
import {
    Module,
    UserList,
    UserProfile,
} from '../components'
import axios from 'axios'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles'

const HomeScreen = ({ navigation }) => {

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
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {loading
                    ? <ActivityIndicator size='small' />
                    : (
                        <View style={styles.modules}>
                            <Module title='Drivers'>
                                <UserList onItemPressed={onItemPressed} users={drivers} />
                            </Module>
                            <Module title='Vendors'>
                                <UserList onItemPressed={onItemPressed} users={vendors} />
                            </Module>
                            <Module title='Customers'>
                                <UserList onItemPressed={onItemPressed} users={customers} />
                            </Module>
                        </View>
                    )
                }
                {feature
                    ? (
                        <View style={styles.aside}>
                            <Module>
                                <UserProfile user={feature} />
                            </Module>
                        </View>
                    )
                    : null
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        // backgroundColor: 'pink',
        // marginHorizontal: 20,
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