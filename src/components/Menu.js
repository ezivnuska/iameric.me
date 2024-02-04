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
    const [products, setProducts] = useState(null)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        
        setLoading('Loading menu...')
        
        const { data } = await axios.get(`/api/products/${vendor._id}`)
        
        setLoading(null)
        
        if (!data) {
            console.log('could not get vendor products')
            return
        }
        
        setProducts(data.products)
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
                : (products && products.length)
                    ? (
                        <FlatList
                            data={products}
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