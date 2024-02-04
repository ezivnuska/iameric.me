import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    DefaultText,
    LoadingView,
    MenuItem,
    PopUpModal,
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

export default ({ vendor }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
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

    const addToCart = (product, quantity) => {

        dispatch({ type: 'ADD_TO_CART', vendor, product, quantity })
        
        setFeatured(null)
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
                            renderItem={({ item }) => (
                                <MenuItem
                                    item={item}
                                    onPress={() => setFeatured(item)}
                                    username={vendor.username}
                                />
                            )}
                        />
                    )
                    : (
                        <DefaultText>No products to display.</DefaultText>
                    )
            }

            <PopUpModal
                visible={featured}
                onRequestClose={() => setFeatured(null)}
            >
                <ProductDetails
                    loading={loading}
                    product={featured}
                    onOrder={addToCart}
                />
            </PopUpModal>
        </View>
    )
}