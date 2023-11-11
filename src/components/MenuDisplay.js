import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    Cart,
    Menu,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles'

export default ({ vendorId }) => {
    
    const {
        dispatch,
        state,
        cart,
        vendors,
    } = useContext(AppContext)

    const [vendor, setVendor] = useState[null]
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setVendor(vendors.map(v => v._id === vendorId)[0])
    }, [vendors])

    useEffect(() => {
        getProducts()
    }, [vendor])

    const getProducts = async () => {
        
        setLoading(true)
        
        const { data } = await axios.
            get(`/api/products/${vendorId}`)
            
        setLoading(false)

        if (!data) {
            console.log('Error loading menu items', err)
            return null
        }
        
        dispatch({ type: 'UPDATE_VENDOR_PRODUCTS', vendorId, products: data.items })
    }

    return (
        <View style={styles.container}>
            {
                (vendor && vendor.products && vendor.products.length)
                    ? <Menu vendor={vendorId} items={vendor.products} />
                    : <Text style={main.text}>No products to display.</Text>
            }
        </View>
    )
}