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
} from '@components'
import {
    useApp,
    useModal,
    useProducts,
} from '@context'

export default () => {

    const { theme } = useApp()
    const { setModal } = useModal()
    const {
        products,
        productsLoading,
    } = useProducts()

    if (productsLoading) return <LoadingView loading='Loading products' />
    
    return (
        <View>
            <TitleBar title='Products'>
                <IconButton
                    label='New Product'
                    iconName='add-outline'
                    onPress={() => setModal('PRODUCT')}
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
                        />
                    )}
                    style={{ marginHorizontal: 10 }}
                />
            ) : <EmptyStatus status='Nothing currently listed.' />}
        </View>
    )
}