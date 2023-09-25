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

const MenuDisplay = ({ vendorId }) => {
    
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
        
        dispatch({ type: 'SET_PRODUCTS', vendor: vendorId, products: data.items })
    }

    const removeItemById = id => {
        let indexToRemove = null
        items.map((item, i) => {
            if (item._id === id) indexToRemove = i
        })
        if (indexToRemove === null) return
        
        const updatedItems = items.filter((item, i) => i !== indexToRemove)
        
        setItems(updatedItems)
    }

    const deleteItem = id => {

        removeItemById(id)
        axios
            .delete('/api/products/delete', { data: { id } })
            .then(({ data }) => {
                // const { entry } = data
                updateStatus('Product deleted.')
            })
            .catch(err => {
                console.log('Error deleting product.', err)
                updateStatus('Error deleting product.')
            })
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

export default MenuDisplay

const styles = StyleSheet.create({
    container: {

    },
})