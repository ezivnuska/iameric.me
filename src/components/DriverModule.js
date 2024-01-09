import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    LoadingView,
    DriverList,
} from '.'
import { loadUsers } from '../utils/data'
import classes from '../styles/classes'

export default () => {

    const {
        dispatch,
        users,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [drivers, setDrivers] = useState(null)

    useEffect(() => {
        if (!users) init()
        else filterUsers('driver')
    }, [])

    useEffect(() => {
        if (users) filterUsers('driver')
    }, [users])

    const init = async () => {
        setLoading('Loading vendors...')
            
        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(null)
    }

    const filterUsers = type => setDrivers(
        users.filter(({ _id, username, profileImage, role }) => {
            if (role == type) {
                return ({ _id, username, profileImage, role })
            }
        })
    )

    return (
        <View>
            
            <Text style={classes.pageTitle}>
                Drivers
            </Text>

            {!users && loading
                ? <LoadingView label={loading} />
                : drivers
                    ? <DriverList users={drivers} />
                    : <Text style={classes.textDefault}>No drivers yet.</Text>
            }
        </View>
    )
}