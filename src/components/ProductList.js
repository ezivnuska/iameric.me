import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import {
    EmptyStatus,
    LoadingView,
    ProductListItem,
} from '.'
import {
    useModal,
    useProducts,
    useUser,
} from '@context'
import { deleteProductWithId, loadProducts } from '@utils/data'

export default () => {

    const {
        deleteProduct,
        products,
        productsLoading,
        setProductsLoading,
    } = useProducts()
    const { closeModal, setModal } = useModal()
    const { profile } = useUser()

    useEffect(() => {
        const initProducts = async () => {
            setProductsLoading(true)
            await loadProducts(profile._id)
            setProductsLoading(false)
        }
        initProducts()
    }, [])

    const onDelete = async id => {

        setProductsLoading(true)
        
        const productDeleted = await deleteProductWithId(id)
        
        if (productDeleted) {
            deleteProduct(productDeleted._id)
            console.log(`${productDeleted.title} deleted`)
        }
        
        setProductsLoading(false)
        
        closeModal()
    }

    if (productsLoading) return <LoadingView />

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
                    onPress={item => {
                        setModal('PRODUCT', { product: item })
                    }}
                />
            )}
        />
    ) : <EmptyStatus status='No products available at this time.' />
}