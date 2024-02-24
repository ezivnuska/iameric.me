import React, { useContext, useEffect } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    ProductList,
} from '.'
import {
    loadProducts,
} from '../utils/data'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'

export default () => {

    const {
        dispatch,
        loading,
        user,
        products,
    } = useContext(AppContext)

    useEffect(() => {
        if (!products) init()
    }, [])

    const init = async () => {
        
        dispatch({ type: 'SET_LOADING', loading: 'Loading products...' })

        const productsLoaded = await loadProducts(user._id)
        
        if (productsLoaded) {
            dispatch({ type: 'SET_PRODUCTS', products: productsLoaded })
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    return products
        ? (
            <ProductList
                products={products}
            />
        )
        : <Text>No products to display.</Text>
}