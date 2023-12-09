import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    Text,
    View,
} from 'react-native'
import {
    MenuItem,
    ModalContent,
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'
import main from '../styles/main'
import axios from 'axios'

export default ({ vendor }) => {

    const {
        dispatch,
        vendors,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(false)
    const [featured, setFeatured] = useState(null)

    useEffect(() => {
        // const vendorItems = fetchItemsWithVendorId(vendor._id)
        // console.log('vendorItems', vendorItems)
        init()
    }, [])

    // const fetchItemsWithVendorId = id => {
    //     if (!vendors) return null
    //     const vendor = vendors.filter(v => v._id === id)[0]
    //     if (!vendor.products) getProducts()
    //     else setItems(vendor.products)
    // }

    // useEffect(() => {
    //     console.log('vendor changed', vendor)
    //     if (vendor) getProducts()
    // }, [vendor])
    
    const init = async () => {
        getProducts()
    }

    const getProducts = async () => {
        
        setLoading(true)
        
        const { data } = await axios.get(`/api/products/${vendor._id}`)
        
        setLoading(false)

        if (!data) {
            console.log('could not get vendor products')
            return
        }
        
        dispatch({ type: 'UPDATE_VENDOR_PRODUCTS', vendorId: vendor._id, products: data.products })
    }

    const addToCart = item => {

        setLoading(true)
        
        dispatch({ type: 'ADD_TO_CART', item, vendor: vendor._id })
        
        setFeatured(null)
        setLoading(false)
    }
    
    return (
        <View
            style={{
                height: '100%',
                marginVertical: 10,
            }}
        >
            {loading
                ? <Text>Loading menu...</Text>
                : (vendor.products && vendor.products.length)
                    ? (
                        <FlatList
                            data={vendor.products}
                            keyExtractor={item => `product-${item._id}`}
                            // style={styles.list}
                            renderItem={({ item }) => (
                                <MenuItem
                                    item={item}
                                    onPress={() => setFeatured(item)}
                                    username={vendor.username}
                                />
                            )}
                        />
                    )
                    : <Text style={main.text}>No products to display.</Text>
            }

            <ModalContent
                visible={featured}
                onRequestClose={() => setFeatured(null)}
                label={featured && featured.title ? featured.title : null}
            >
                <ProductDetails loading={loading} product={featured} onOrder={addToCart} />
            </ModalContent>
        </View>
    )
}