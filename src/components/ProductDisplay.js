import React, { useContext, useEffect, useState } from 'react'
import {
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

export default () => {

    const {
        dispatch,
        products,
    } = useContext(AppContext)

    // const [items, setItems] = useState(null)
    const [featured, setFeatured] = useState(null)

    useEffect(() => {
        console.log('products on load:', products)
        if (!products) {
            console.log('no products:', products)
        }
    }, [])

    useEffect(() => {
        if (products) console.log('products changed:', products)
    }, [products])

    const onDelete = async id => {
        const { data } = await axios.
            delete('/api/products/delete', { data: { id } })
        
        if (!data) {
            console.log('Error deleting product')
            return null
        }

        // setItems(items.filter(item => item._id !== data.item._id))
        dispatch({ type: 'REMOVE_PRODUCT', productId: id})
        
        return data
    }

    // const updateProducts = async product => {
    //     const updatedProducts = []
    //     items.map(item => {
    //         if (product._id === item._id) {
    //             updatedProducts.push(product)
    //         } else updatedProducts.push(item)
    //     })

    //     return updatedProducts
    // }

    const onProductFormSubmitted = async productData => {
        dispatch({ type: 'UPDATE_PRODUCT', productData })
        console.log('ProductForm submitted', productData)
        // const updatedProducts = await updateProducts(product)
        // setItems(updatedProducts)
        setFeatured(null)
    }

    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Text style={[main.heading, main.paddedV]}>Products</Text>
                <AddButton
                    iconStyle={{
                        flex: 1,
                        flexGrow: 0,
                        flexShrink: 1,
                        flexBasis: 'auto',
                        marginHorizontal: 7,
                    }}
                    onPress={() => setFeatured(true)}
                />
            </View>

            {(products && products.length)
                ? (
                    <ProductList
                        productIds={products}
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