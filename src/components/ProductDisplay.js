import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    AddButton,
    ModalContent,
    ProductForm,
    ProductList,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'

const ProductDisplay = () => {

    const {
        products,
    } = useContext(AppContext)

    const [items, setItems] = useState(products)
    const [loading, setLoading] = useState(false)
    const [featured, setFeatured] = useState(null)

    const onDelete = async id => {
        const { data } = await axios.
            delete('/api/products/delete', { data: { id } })
        
        if (!data) {
            console.log('Error deleting product')
            return
        }

        setItems(items.filter(item => item._id !== data.item._id))
    }

    const updateProducts = product => {
        const updatedProducts = items.map(
            item => product._id === item._id
                ? product
                : item
            )

        setItems(updatedProducts)
    }

    const onProductFormSubmitted = product => {
        updateProducts(product)
        setFeatured(null)
    }

    return (
        <View>
            <View style={styles.displayHeader}>
                <Text style={[main.heading, main.paddedV]}>Products</Text>
                <AddButton iconStyle={styles.headerButton} onPress={() => setFeatured(true)} />
            </View>

            {loading ?
                <Text style={main.text}>Loading products...</Text> :
                (items && items.length) ? (
                    <ProductList
                        items={items}
                        onPress={item => setFeatured(item)}
                    />
                ) : <Text style={main.text}>No products to display.</Text>
            }

            <ModalContent
                visible={featured}
                onRequestClose={() => setFeatured(null)}
                label={`${featured && featured._id ? 'Edit' : 'Add'} Product`}
            >
                <ProductForm
                    onComplete={onProductFormSubmitted}
                    onDelete={onDelete}
                    product={featured}
                />
            </ModalContent>
        </View>
    )
}

export default ProductDisplay

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 10,
        // paddingHorizontal: 10,
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
    headerButton: {
        // marginVertical: 4,
        flex: 1,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        marginHorizontal: 7,
    },
})