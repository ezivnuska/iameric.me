import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    Text,
    View,
} from 'react-native'
import {
    LoadingView,
    MenuItem,
    PopUpModal,
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'
// import main from '../styles/main'
import classes from '../styles/classes'
import axios from 'axios'

export default ({ vendor }) => {

    const {
        dispatch,
        // vendors,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    // const [items, setItems] = useState(false)
    const [featured, setFeatured] = useState(null)

    useEffect(() => {
        init()
    }, [])
    
    const init = async () => {
        getProducts()
    }

    const getProducts = async () => {
        
        setLoading('Loading menu...')
        
        const { data } = await axios.get(`/api/products/${vendor._id}`)
        
        setLoading(null)
        
        if (!data) {
            console.log('could not get vendor products')
            return
        }
        
        dispatch({ type: 'UPDATE_VENDOR_PRODUCTS', vendorId: vendor._id, products: data.products })
    }

    const addToCart = item => {

        // setLoading(true)
        
        dispatch({ type: 'ADD_TO_CART', item, vendor: vendor._id })
        
        setFeatured(null)
        // setLoading(false)
    }
    
    return (
        <View
            style={{
                height: '100%',
                marginVertical: 10,
            }}
        >
            {loading
                ? <LoadingView label={loading} />
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
                    : <Text style={classes.textDefault}>No products to display.</Text>
            }

            <PopUpModal
                visible={featured}
                onRequestClose={() => setFeatured(null)}
            >
                <ProductDetails loading={loading} product={featured} onOrder={addToCart} />
            </PopUpModal>
        </View>
    )
}