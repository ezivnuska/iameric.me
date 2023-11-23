import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    UserList,
} from '.'
import { loadUsers } from '../utils/data'

export default ({ type }) => {

    const {
        dispatch,
        users,
        state,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(null)

    const setUsers = array => {
        console.log('array', array)
        setItems(array)
    }

    useEffect(() => {
        if (!users) init()
    }, [])

    useEffect(() => {
        console.log('users', users)
        console.log('type', state[type])
        // if (users) {
        //     switch (type) {
        //         case 'customer': setUsers(state.customers); break
        //         case 'vendor': setUsers(state.vendors); break
        //         case 'driver': setUsers(state.drivers); break
        //     }
        // }
    }, [users])

    const init = async () => {
        
        setLoading(true)
            
        const loadedUsers = await loadUsers()
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(false)
    }

    return loading
        ? <Text>Loading users...</Text>
        : items
            ? <UserList users={items} />
            : <Text>No users to display.</Text>
}