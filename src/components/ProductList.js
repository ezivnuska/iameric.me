import React, { useEffect } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
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
import { deleteProductWithId, loadProducts } from '@utils/products'

export default () => {

    const {
        deleteProduct,
        products,
        productsLoading,
        setProducts,
        setProductsLoading,
    } = useProducts()
    const { closeModal, setModal } = useModal()
    const { profile } = useUser()

    useEffect(() => {
        const initProducts = async () => {
            setProductsLoading(true)
            const items = await loadProducts(profile._id)
            setProductsLoading(false)
            setProducts(items)
        }
        initProducts()
    }, [])

    const onDelete = async id => {
        setProductsLoading(true)
        const productDeleted = await deleteProductWithId(id)
        setProductsLoading(false)

        if (productDeleted) {
            console.log(`${productDeleted.title} deleted`)
            deleteProduct(productDeleted._id)
        }
        closeModal()
    }

    if (productsLoading) return <LoadingView loading='Loading products' />

    return products && products.length ? (
        <View
            style={{ paddingVertical: 10 }}
        >
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
                        onPress={item => setModal('PRODUCT', item)}
                    />
                )}
            />
        </View>
    ) : <EmptyStatus status='No products available at this time.' />
}