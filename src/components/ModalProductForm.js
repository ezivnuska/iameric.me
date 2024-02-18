import React, { useContext } from 'react'
import {
    ProductForm,
} from '.'
import { AppContext } from '../AppContext'

export default () => {

    const { 
        dispatch,
        loading,
        featured,
        product,
    } = useContext(AppContext)

    const onDelete = async id => {

        dispatch({ type: 'SET_LOADING', loading: 'Deleting product...' })

        const productDeleted = await deleteProductWithId(id)
        
        if (productDeleted) {
            dispatch({ type: 'DELETE_PRODUCT', id: productDeleted._id })
            console.log(`${productDeleted.title} deleted`)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
        
        dispatch({ type: 'CLOSE_MODAL' })
    }
    
    return (
        <ProductForm
            product={product}
            onComplete={prod => dispatch({ type: 'UPDATE_PRODUCT', prod })}
            onDelete={() => onDelete(featured._id)}
        />
    )
}