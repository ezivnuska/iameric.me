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
        user,
        products,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)
    const [featured, setFeatured] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (products) {
            setItems(products)
        } else {
            fetchProducts()
        }
    }, [])

    const fetchProducts = async () => {
        const newProducts = await getProducts(dispatch, user._id)
        console.log('new products', newProducts)
        setItems(newProducts)
    }

    useEffect(() => {
        if (featured) setShowModal(true)
        else setShowModal(false)
    }, [featured])

    const matchProductsToItems = async () =>  {
        if (!items || items.length !== products.length) {
            fetchProducts()
            return
        }
        console.log('items/products', items, products)
        console.log('items/products:length', items.length, products.length)
        const returnArray = products.map((p, i) => {
            const item = items[i]
            console.log('item.image._id', item.image._id)
            console.log('p.image._id', p.image._id)
            if (item.image._id !== p.image._id) {
                console.log('found image to update')
                return p
            }
            return item
        })
        return returnArray
    }

    useEffect(() => {
        // const filteredItems = matchProductsToItems()
        if (!items) setItems(products)
        if (products && items) {
            let changed = false
            let updatedItems = items
            if (products.length !== items.length) {
                setItems(products)
            } else {
                updatedItems = products.map((prod, index) => {
                    const item = items[index]
                    if (prod._id === item._id) {
                        if (item.image._id !== prod.image._id) {
                            return prod
                        } else return item
                    }
                })
                setItems(updatedItems)
            }
        }
        // else fetchProducts()
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
        // console.log('product form submitted', productData)
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
                            console.log(`showing details for ${item.title}`)
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