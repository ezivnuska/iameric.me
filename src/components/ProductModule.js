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
import {
    deleteProductWithId,
    loadProducts,
} from '../utils/data'
import axios from 'axios'
import main from '../styles/main'

export default () => {

    const {
        dispatch,
        user,
        products,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [featured, setFeatured] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (!products) init()
    }, [])

    const init = async () => {
        setLoading(true)

        const productsLoaded = await loadProducts(user._id)
        
        if (productsLoaded) {
            dispatch({ type: 'SET_PRODUCTS', products: productsLoaded })
        }

        setLoading(false)
    }

    useEffect(() => {
        if (featured) setShowModal(true)
        else setShowModal(false)
    }, [featured])

    const onDelete = async id => {

        setLoading(true)

        const productDeleted = await deleteProductWithId(id)
        
        if (productDeleted) {
            dispatch({ type: 'DELETE_PRODUCT', id: productDeleted._id })
            console.log(`${productDeleted.title} deleted`)
        }
            
        setLoading(false)
        
        setFeatured(false)
    }

    const onProductFormSubmitted = async product => {
        dispatch({ type: 'UPDATE_PRODUCT', product })
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

            {loading
                ? <Text>Loading...</Text>
                : products
                    ? (
                        <ProductList
                            products={products}
                            onPress={item => setFeatured(item)}
                        />
                    )
                    : <Text>No products to display.</Text>
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