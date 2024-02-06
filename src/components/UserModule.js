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

    useEffect(() => {
        setMounted(true)
        if (!users) init()
        return () => setMounted(false)
    }, [])

    const init = async () => {
        setLoading(`Loading ${user.role}s...`)
        
        const loadedUsers = await loadUsersByRole(user.role)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers.filter(u => u._id !== user._id) })
        }

        // if (mounted)
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