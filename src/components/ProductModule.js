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

    return (
        <View>
            <IconButton
                label='Products'
                onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'PRODUCT' })}
                disabled={loading}
                iconName='add-outline'
                alignIcon='right'
                align='left'
                padded={false}
                transparent
                textStyles={classes.headerSecondary}
            />

            {loading
                ? <Text>Loading...</Text>
                : products
                    ? (
                        <ProductList
                            products={products}
                        />
                    )
                    : <Text>No products to display.</Text>
            }
            
        </View>
    )
}