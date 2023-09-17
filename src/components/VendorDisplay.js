import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    DefaultText,
    Heading,
    LoadingView,
    PanelView,
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

    return (
        <View style={{ height: '100%' }}>
            {loading
                ? (
                    <PanelView style={{ height: '100%' }}>
                        <LoadingView label='Loading Vendors...' />
                    </PanelView>
                )
                : vendors
                    ? (
                        <View>
                            <Heading style={main.padded}>{`Restaurants (${vendors.length})`}</Heading>
                            <PanelView type='expanded'>
                                <VendorList users={vendors} />
                            </PanelView>
                        </View>
                    ) : null}
        </View>
    )
}

export default VendorDisplay

const styles = StyleSheet.create({
    container: {
        
    },
})