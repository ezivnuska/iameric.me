import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    VendorList,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import defaultStyles from '../styles'

const VendorDisplay = () => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user, users } = state

    const [vendors, setVendors] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [vendor, setVendor] = useState(null)

    const getVendors = async () => {
        setLoading(true)

        const { data } = await axios.
            get('/api/vendors')

        if (!data) console.log('Error: could not get vendors')

        setLoading(false)
        setVendors(data.vendors)
    }

    useEffect(() => {
        getVendors()
    }, [])
    
    // useEffect(() => {
    //     getVendors()
    // }, [user])
    
    // const onItemPressed = vendor => {
    //     setVendor(vendor)
    // }

    return (
        <View style={styles.container}>
            
            <View style={styles.displayHeader}>
                <Text style={defaultStyles.subheading}>Participating Vendors</Text>
            </View>

            {
                loading
                    ? <Text style={defaultStyles.text}>Loading Vendors...</Text>
                    : <VendorList users={vendors} />
            }
            
        </View>
    )
}

export default VendorDisplay

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    displayHeader: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        marginBottom: 15,
    },
})