import React, { useContext, useEffect } from 'react'
import { FlatList } from 'react-native'
import {
    LoadingView,
    ProductListItem,
    ThemedText,
} from '.'
import { AppContext } from '../AppContext'
import { deleteProductWithId, loadProducts } from '../utils/data'

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

    return products && products.length ? (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            listKey={() => 'products'}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
                <ProductListItem
                    product={item}
                    key={item => `product-${item._id}`}
                    onDelete={() => onDelete(item._id)}
                    onPress={item => dispatch({ type: 'SET_PRODUCT', productData: item })}
                />
            )}
        />
    ) : (
        <ThemedText style={{ paddingHorizontal: 10 }}>
            No products available at this time.
        </ThemedText>
    )
}