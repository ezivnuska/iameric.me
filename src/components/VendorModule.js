import React, { useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    LoadingView,
    VendorList,
} from '.'
import { loadUsersByRole } from '../utils/data'

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

            {loading
                ? <LoadingView label={loading} />
                : vendors
                    ? <VendorList users={vendors} />
                    : <ThemedText>No participating vendors.</ThemedText>
            }

        </View>
    )
}