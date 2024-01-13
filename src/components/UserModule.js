import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    LoadingView,
    UserList,
} from '.'
import { loadUsers } from '../utils/data'
import classes from '../styles/classes'

export default () => {

    const {
        dispatch,
        users,
        // user,
    } = useContext(AppContext)

    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(null)
    const [customers, setCustomers] = useState(null)

    useEffect(() => {
        setMounted(true)
        if (!users) init()
        else filterUsers('customer')
        // return () => setMounted(false)
    }, [])

    useEffect(() => {
        
        if (users) {
            const filteredUsers = [
                ...filterUsers('customer'),
                ...filterUsers('admin'),
            ]
            // if (mounted)
            setCustomers(filteredUsers)
        }
    }, [users])

    const init = async () => {
        setLoading('Loading users...')
            
        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        // if (mounted)
        setLoading(null)
    }

    const filterUsers = type => users.filter(({ _id, username, profileImage, role }) => {
        if (role == type) {
            return ({ _id, username, profileImage, role })
        }
    })

    return (
        <View>
            
            <Text style={classes.pageTitle}>
                Customers
            </Text>

            {loading
                ? <LoadingView label={loading} />
                : users
                    ? <UserList users={customers} />
                    : <Text style={classes.textDefault}>No users to display.</Text>}
        </View>
    )
}