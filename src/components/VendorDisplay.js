import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    DefaultText,
    VendorList,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'

const VendorDisplay = () => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user, users } = state

    const [vendors, setVendors] = useState(null)
    const [loading, setLoading] = useState(false)
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

    return loading
        ? <DefaultText style={[main.text, main.padded]}>Loading Vendors...</DefaultText>
        : vendors
            ? (
                <View>
                    <DefaultText style={[main.heading, main.padded]}>{`Restaurants (${vendors.length})`}</DefaultText>
                    <VendorList users={vendors} />
                </View>
            ) : null
}

export default VendorDisplay

const styles = StyleSheet.create({
    container: {
        
    },
})