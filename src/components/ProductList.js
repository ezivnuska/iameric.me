import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import { ProductListItem } from '.'
import { AppContext } from '../AppContext'
import { deleteProductWithId } from '../utils/data'

export default ({ products, update }) => {
    const {
        dispatch,
        featured,
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
        <FlatList
            data={products}
            listKey={() => 'products'}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
                <ProductListItem
                    product={item}
                    key={item => `product-${item._id}`}
                    update={update}
                    onDelete={() => onDelete(item._id)}
                    onPress={item => dispatch({ type: 'SET_PRODUCT', product: item })}
                />
            )}
            style={{
                marginVertical: 10,
            }}
        />
    )
}