import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    EntryModule,
    UserFilter,
} from '.'
import { loadUsers } from '../utils/data'

export default () => {

    const {
        dispatch,
        users,
        user,
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

    const otherUsers = () => users.filter(u => u._id !== user._id)

    return loading
        ? <Text>Loading users...</Text>
        : users
            ? <UserFilter users={otherUsers().map(({ _id, username, profileImage, role }) => ({ _id, username, profileImage, role }))} />
            : <Text>No users to display.</Text>
}