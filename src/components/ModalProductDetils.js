import React, { useContext, useEffect, useState } from 'react'
import {
    LoadingView,
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'
import { loadProduct } from '@utils/data'

export default ({ id }) => {

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    const [product, setProduct] = useState(null)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const { data } = await loadProduct(dispatch, id)
        if (!data) return console.log('could not load product')
        else {
            console.log('loadedProduct', data)
            setProduct(data)
        }
    }

    const addToCart = (item, quantity) => {
        dispatch({ type: 'ADD_TO_CART', product: item, quantity })
    }
    
    if (loading) return <LoadingView />

    return product && (
        <ProductDetails
            loading={loading}
            product={product}
            onOrder={addToCart}
        />
    )
}