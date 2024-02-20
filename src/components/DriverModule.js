import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    ThemedText,
    LoadingView,
    DriverList,
} from '.'
import { loadUsersByRole } from '../utils/data'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

export default () => {

    const theme = useTheme()

    const {
        dispatch,
        loading,
        user,
        users,
    } = useContext(AppContext)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Loading drivers...' })
            
        const loadedUsers = await loadUsersByRole(user.role)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        dispatch({ type: 'SET_LOADING', loading: null })
    }

    return (
        <View>
            
            <ThemedText
                style={classes.pageTitle}
            >
                Drivers
            </ThemedText>

            {loading
                ? <LoadingView label={loading} />
                : users
                    ? <DriverList users={users} />
                    : <ThemedText>No drivers yet.</ThemedText>
            }
        </View>
    )
}