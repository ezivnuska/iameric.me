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
    useApp,
    useModal,
    useProducts,
    useUser,
} from '@context'
import { deleteProductWithId, loadProducts } from '@utils/products'

export default () => {

    const { userId, userLoading } = useApp()
    const { closeModal, setModal } = useModal()
    const {
        deleteProduct,
        products,
        productsLoading,
        setProducts,
        setProductsLoading,
    } = useProducts()
    const { profile } = useUser()

    // useEffect(() => {
    //     init()
    // }, [])

    useEffect(() => {
        const init = async () => {

            if (!profile) {
                loadProfile(userId)
            } else {
                setProductsLoading(true)
                const items = await loadProducts(profile._id)
                setProductsLoading(false)
                setProducts(items)
            }
        }
        if (profile) init()
    }, [profile])

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
    if (!products || !products.length) return <EmptyStatus status='No products available at this time.' />
    return (
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
    )
}