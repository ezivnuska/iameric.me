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
        loading,
        users,
        user,
    } = useContext(AppContext)

    let interval = undefined

    const unsubscribe = () => {
        clearInterval(interval)
        interval = undefined
    }

    useEffect(() => {
        if (!users) loadUsers()
        interval = setInterval(loadUsers, 1000 * (60 * 10))
        return () => unsubscribe()
    }, [])

    const loadUsers = async () => {

        dispatch({ type: 'SET_LOADING', loading: `Loading ${user.role === 'admin' ? 'all users' : user.role}s...`})
        
        const loadedUsers = await loadUsersByRole(user.role)
        
        if (!loadedUsers) {
            console.log('Error loading users')
        } else {
            dispatch({ type: 'SET_USERS', users: loadedUsers.filter(u => u._id !== user._id) })
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    return (
        <View>

            {loading
                ? <LoadingView label={loading} />
                : users && users.length
                ? <UserList users={users} />
                : <ThemedText>No users to display.</ThemedText>
            }
        
        </View>
    )
}