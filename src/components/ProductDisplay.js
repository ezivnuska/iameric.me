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
import { getProducts } from '../Data'
import axios from 'axios'
import main from '../styles/main'

export default () => {

    const {
        dispatch,
        products,
        user,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)
    const [featured, setFeatured] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (products) {
            setItems(products)
        } else if (!items) {
            fetchProductData(user._id)
        }
    }, [])

    const fetchProductData = async userId => {
        const items = await getProducts(dispatch, userId)
        if (!items) console.log('could not fetch products.')
        setItems(items)
        dispatch({ type: 'SET_PRODUCTS', products: items })
    }

    useEffect(() => {
        if (featured) setShowModal(true)
        else setShowModal(false)
    }, [featured])

    useEffect(() => {
        if (products) {
            setItems(products)
        }
    }, [products])

    const onDelete = async id => {
        const { data } = await axios.
            delete(`/api/products/delete/${id}`)
        
        if (!data.product) {
            console.log('Error deleting product')
            return null
        }

        // setItems(items.filter(item => item._id !== data.item._id))
        dispatch({ type: 'REMOVE_PRODUCT', productId: data.product._id })

        setFeatured(false)
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

    const onProductFormSubmitted = async productData => {
        dispatch({ type: 'UPDATE_PRODUCT', product: productData })
        console.log('product form submitted', productData)
        const updatedProducts = await updateProducts(productData)
        setItems(updatedProducts)
        closeModal()
    }

    const closeModal = () => {
        if (featured) setFeatured(null)
        setShowModal(false)
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
                    onPress={() => setShowModal(true)}
                />
            </View>

            {items
                ? (
                    <ProductList
                        products={items}
                        onPress={item => {
                            console.log('item featured>>', item)
                            setFeatured(item)
                        }}
                    />
                ) : <Text style={main.text}>No products to display.</Text>
            }

            <ModalContent
                visible={showModal || featured}
                onRequestClose={closeModal}
                label={`${featured && featured._id ? 'Edit' : 'Add'} Product`}
            >
                <ProductForm
                    onComplete={onProductFormSubmitted}
                    onDelete={() => onDelete(featured._id)}
                    existingProduct={featured}
                />
            </ModalContent>
        </View>
    )
}