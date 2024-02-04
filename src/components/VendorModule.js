import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    DefaultText,
    LoadingView,
    VendorList,
} from '.'
import { loadUsersByRole } from '../utils/data'
import classes from '../styles/classes'

export default () => {

    const [loading, setLoading] = useState(null)
    const [vendors, setVendors] = useState(null)

    useEffect(() => {
        loadVendors()
    }, [])

    const loadVendors = async () => {
        setLoading('Loading vendors...')
        const users = await loadUsersByRole('vendor')
        setVendors(users)
        setLoading(null)
    }

    return (
        <View>
            
            <DefaultText style={classes.pageTitle}>
                Vendors
            </DefaultText>

            {loading
                ? <LoadingView label={loading} />
                : vendors
                    ? <VendorList users={vendors} />
                    : <DefaultText>No participating vendors.</DefaultText>
            }
        </View>
    )
}