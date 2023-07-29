import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    VendorList,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

const VendorDisplay = () => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user, users } = state

    const [vendors, setVendors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [vendor, setVendor] = useState(null)

    const getVendors = () => {
        setLoading(true)

        axios
            .get('/api/vendors')
            .then(({ data }) => {
                setLoading(false)
                setVendors(data.vendors)
            })
            .catch(err => console.log('Error getting vendors:', err))
    }

    useEffect(() => {
        getVendors()
    }, [])
    
    useEffect(() => {
        getVendors()
    }, [user])
    
    const onItemPressed = vendor => {
        setVendor(vendor)
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.displayHeader}>
                <Text style={styles.title}>Restaurants</Text>
            </View>

            <VendorList
                users={vendors}
                onItemPressed={vendor => onItemPressed(vendor)}
            />
        </View>
    )
}

export default VendorDisplay

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
    },
})