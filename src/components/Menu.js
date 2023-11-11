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
    } = useContext(AppContext)

    const [featured, setFeatured] = useState(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        setLoading('Menu: Loading products...')
        const { data } = await axios.get(`/api/products/${vendor._id}`)
        setLoading(null)
        if (!data) {
            console.log('oops... could not get vendor products')
            return
        }
        setProducts(data.products)
        dispatch({ type: 'UPDATE_VENDOR_PRODUCTS', vendor: vendor._id, products: data.products })
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
                marginTop: 10,
            }}
        >
            {(products && products.length)
                ? (
                    <FlatList
                        data={products}
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
                ) : <Text style={main.text}>No products to display.</Text>}

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