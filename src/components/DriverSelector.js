import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    UserList,
} from '.'
import { loadUsers } from '../utils/data'

export default () => {

    const {
        drivers,
        dispatch,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!drivers) init()
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
        : drivers
            ? <UserList users={drivers} />
            : <Text>No users to display.</Text>
}