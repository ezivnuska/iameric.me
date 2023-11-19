import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
} from 'react-native'
import {
    VendorList,
} from '.'
import { AppContext } from '../AppContext'
import { loadUsers } from '../utils/data'

export default () => {

    const {
        dispatch,
        vendors,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!vendors) init()
    }, [])

    const init = async () => {
        
        setLoading(true)
        
        const vendorsLoaded = await loadUsers()
        
        if (vendorsLoaded) {
            dispatch({ type: 'SET_USERS', users: vendorsLoaded })
        }

        setLoading(false)
    }

    return loading
        ? <Text>Loading...</Text>
        : vendors
            ? <VendorList users={vendors} />
            : <Text>No Available Vendors</Text>
}