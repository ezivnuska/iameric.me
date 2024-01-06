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

    const [loading, setLoading] = useState(false)
    const [customers, setCustomers] = useState(null)

    useEffect(() => {
        if (!users) init()
        else filterUsers('customer')
    }, [])

    useEffect(() => {
        if (users) filterUsers('customer')
    }, [users])

    const init = async () => {
        setLoading('Loading users...')
            
        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(null)
    }

    const filterUsers = type => setCustomers(
        users.filter(({ _id, username, profileImage, role }) => {
            if (role == type) {
                return ({ _id, username, profileImage, role })
            }
        })
    )

    return (
        <View>
            
            <Text style={classes.pageTitle}>
                Customers
            </Text>

            {!users && loading
                ? <LoadingView label={loading} />
                : customers
                    ? <UserList users={customers} />
                    : <Text style={classes.textDefault}>No users to display.</Text>}
        </View>
    )
}