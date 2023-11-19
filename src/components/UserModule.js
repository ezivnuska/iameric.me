import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
} from 'react-native'
// import axios from 'axios'
// import UserList from './UserList'
import { AppContext } from '../AppContext'
import UserFilter from './UserFilter'
import { loadUsers } from '../utils/data'

export default () => {

    const {
        dispatch,
        users,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!users) init()
    }, [])

    const init = async () => {
        setLoading(true)
            
        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(false)
    }

    return loading
        ? <Text>Loading users...</Text>
        : users
            ? <UserFilter users={users} />
            : <Text>No users to display.</Text>
}