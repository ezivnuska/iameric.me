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
import { loadUsersByRole } from '../utils/data'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

export default () => {

    const theme = useTheme()

    const {
        dispatch,
    } = useContext(AppContext)

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
            
            <Text
                style={[
                    classes.pageTitle,
                    { color: theme?.colors.textDefault },
                ]}
            >
                Vendors
            </Text>

            {loading
                ? <LoadingView label={loading} />
                : vendors
                    ? <VendorList users={vendors} />
                    : (
                        <Text
                            style={[
                                classes.textDefault,
                                { color: theme?.colors.textDefault },
                            ]}
                        >
                            No participating vendors.
                        </Text>
                    )
            }
        </View>
    )
}