import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    LoadingView,
    VendorList,
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
    const [vendors, setVendors] = useState(null)

    useEffect(() => {
        if (!users) init()
        else filterUsers('vendor')
    }, [])

    useEffect(() => {
        if (users) filterUsers('vendor')
    }, [users])

    const init = async () => {
        setLoading('Loading vendors...')
            
        const loadedUsers = await loadUsers(loadedUsers)
        
        if (loadedUsers) {
            dispatch({ type: 'SET_USERS', users: loadedUsers })
        }

        setLoading(null)
    }

    const filterUsers = type => setVendors(
        users.filter(({ _id, username, profileImage, role }) => {
            if (role == type) {
                return ({ _id, username, profileImage, role })
            }
        })
    )

    return (
        <View>
            
            <Text style={classes.pageTitle}>
                Vendors
            </Text>

            {!users && loading
                ? <LoadingView label={loading} />
                : vendors
                    ? <VendorList users={vendors} />
                    : <Text style={classes.textDefault}>No participating vendors.</Text>
            }
        </View>
    )
}