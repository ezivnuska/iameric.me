import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    LoadingView,
    UserList,
} from '.'
import { loadUsersByRole } from '../utils/data'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

export default () => {

    const theme = useTheme()
    
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
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        // if (mounted)
        setLoading(null)
    }

    return (
        <View>
            
            <Text
                style={[
                    classes.pageTitle,
                    { color: theme?.colors.textDefault },
                ]}
            >
                Customers
            </Text>

            {loading
                ? <LoadingView label={loading} />
                : users
                    ? <UserList users={users} />
                    : (
                        <Text
                            style={[
                                classes.textDefault,
                                { color: theme?.colors.textDefault },
                            ]}
                        >
                            No users to display.
                        </Text>
                    )
                }
        </View>
    )
}