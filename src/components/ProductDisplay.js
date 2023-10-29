import React, { useContext, useEffect, useState } from 'react'
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
    const [featured, setFeatured] = useState(null)

    useEffect(() => {
        if (products) setItems(products)
    }, [products])

    const onDelete = async id => {
        const { data } = await axios.
            delete('/api/products/delete', { data: { id } })
        
        if (!data) {
            console.log('Error deleting product')
            return null
        }

        setItems(items.filter(item => item._id !== data.item._id))

        return data
    }

    const updateProducts = async product => {
        const updatedProducts = []
        items.map(item => {
            if (product._id === item._id) {
                updatedProducts.push(product)
            } else updatedProducts.push(item)
        })

        return updatedProducts
    }

    const onProductFormSubmitted = async product => {
        console.log('ProductForm submitted', product)
        const updatedProducts = await updateProducts(product)
        setItems(updatedProducts)
        setFeatured(null)
    }

    return (
        <View>
            <View style={styles.displayHeader}>
                <Text style={[main.heading, main.paddedV]}>Products</Text>
                <AddButton iconStyle={styles.headerButton} onPress={() => setFeatured(true)} />
            </View>

            {(items && items.length)
                ? (
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
                    existingProduct={featured}
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