import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    LoadingView,
    UserList,
} from '.'
import { AppContext } from '../AppContext'
import { loadUsersByRole } from '../utils/data'

export default () => {
    
    const {
        dispatch,
        users,
        user,
    } = useContext(AppContext)

    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(null)
    let interval = undefined

    useEffect(() => {
        setMounted(true)
        if (!users) loadUsers()
        interval = setInterval(loadUsers, 1000 * (60 * 10))
        return () => setMounted(false)
    }, [])

    useEffect(() => {
        if (!mounted) {
            clearInterval(interval)
            interval = undefined
        }
    }, [mounted])

    const loadUsers = async () => {

        setLoading(`Loading ${user.role === 'admin' ? 'all users' : user.role}s...`)
        
        const loadedUsers = await loadUsersByRole(user.role)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers.filter(u => u._id !== user._id) })
        }

        setLoading(null)
    }

    return (
        <View>

            {loading
                ? <LoadingView label={loading} />
                : users
                    ? <UserList users={users} />
                    : <ThemedText>No users to display.</ThemedText>
            }
        
        </View>
    )
}