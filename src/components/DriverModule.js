import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    DefaultText,
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
        user,
        users,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {

        setLoading('Loading drivers...')
            
        const loadedUsers = await loadUsersByRole(user.role)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(null)
    }

    return (
        <View>
            
            <DefaultText
                style={classes.pageTitle}
            >
                Drivers
            </DefaultText>

            {loading
                ? <LoadingView label={loading} />
                : users
                    ? <DriverList users={users} />
                    : <DefaultText>No drivers yet.</DefaultText>
            }
        </View>
    )
}