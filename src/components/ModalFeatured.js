import React, { useContext } from 'react'
import {
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'

export default () => {

    const {
        dispatch,
        featured,
        loading,
    } = useContext(AppContext)

    const addToCart = (product, quantity) => {
        dispatch({ type: 'ADD_TO_CART', product, quantity })
    }
    
    return (
        <ProductDetails
            loading={loading}
            product={featured}
            onOrder={addToCart}
        />
    )
}