import React, { useContext, useEffect } from 'react'
import { FlatList } from 'react-native'
import {
    EmptyStatus,
    LoadingView,
    ProductListItem,
} from '.'
import { AppContext } from '@context'
import { ProductContext } from '../context/ProductContext'
import { deleteProductWithId, loadProducts } from '../utils/data'

export default () => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        if (user && !user.products) loadProducts(dispatch, user._id)
    }, [user])

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

    if (loading) return <LoadingView />

    return user.products && user.products.length ? (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={user.products}
            listKey={() => 'products'}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
                <ProductListItem
                    product={item}
                    key={item => `product-${item._id}`}
                    onDelete={() => onDelete(item._id)}
                    onPress={item => {
                        dispatch({
                            type: 'SET_MODAL',
                            payload: {
                                type: 'PRODUCT',
                                data: { product: item },
                            },
                        })
                    }}
                />
            )}
        />
    ) : <EmptyStatus status='No products available at this time.' />
}