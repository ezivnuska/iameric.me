import React from 'react'
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
    useModal,
    useProducts,
} from '@context'
import { deleteProductWithId } from '@utils/products'

export default () => {

    const { theme } = useApp()
    const { closeModal, setModal } = useModal()
    const {
        deleteProduct,
        products,
        productsLoading,
        setProductsLoading,
    } = useProducts()

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
    
    return (
        <View>
            <TitleBar title='Products'>
                <IconButton
                    label='New Product'
                    iconName='add-outline'
                    onPress={product => setModal('PRODUCT', product)}
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
            {products.length ? (
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
                            onPress={() => setModal('PRODUCT', item)}
                        />
                    )}
                    style={{ marginHorizontal: 10 }}
                />
            ) : <EmptyStatus status='Nothing currently listed.' />}
        </View>
    )
}