import React, { useEffect } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    EmptyStatus,
    IconButton,
    LoadingView,
    ProductListItem,
    TitleBar,
} from '.'
import {
    useApp,
    useProducts,
    useUser,
} from '@context'
import { deleteProductWithId, loadProducts } from '@utils/products'
import { loadUser } from '@utils/user'

export default () => {

    const { theme, userId } = useApp()
    const {
        closeProductModal,
        deleteProduct,
        products,
        productsLoading,
        setProducts,
        setProductModal,
        setProductsLoading,
    } = useProducts()
    const { profile, setUser, userLoading } = useUser()

    useEffect(() => {
        const init = async () => {
            if (!profile) {
                const { data } = await loadUser(userId)
                if (data) setUser(data)
            } else {
                if (!products && !userLoading) {
                    setProductsLoading(true)
                    const items = await loadProducts(profile._id)
                    setProductsLoading(false)
                    setProducts(items)
                }
            }
        }
        init()
    }, [profile])

    const onDelete = async id => {
        setProductsLoading(true)
        const productDeleted = await deleteProductWithId(id)
        setProductsLoading(false)

        if (productDeleted) {
            console.log(`${productDeleted.title} deleted`)
            deleteProduct(productDeleted._id)
        }
        closeProductModal()
    }

    if (productsLoading) return <LoadingView loading='Loading products' />
    if (!products || !products.length) return <EmptyStatus status='No products available at this time.' />
    return (
        <View>
            <TitleBar title='Products'>
                <IconButton
                    label='New Product'
                    iconName='add-outline'
                    onPress={product => setProductModal('PRODUCT', product)}
                    alignIcon='right'
                    textStyles={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: theme?.colors.textDefault,
                    }}
                    transparent
                    padded={false}
                />
            </TitleBar>
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
                        onPress={() => setProductModal('PRODUCT', item)}
                    />
                )}
            />
        </View>
    )
}