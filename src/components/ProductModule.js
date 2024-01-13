import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    IconButton,
    PopUpModal,
    ProductForm,
    ProductList,
} from '.'
import { AppContext } from '../AppContext'
import {
    deleteProductWithId,
    loadProducts,
} from '../utils/data'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classes from '../styles/classes'
import Icon from 'react-native-vector-icons/Ionicons'

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
            <IconButton
                label='Products'
                onPress={() => setShowModal(true)}
                disabled={loading}
                iconName='add-outline'
                alignIcon='right'
                align='left'
                padded={false}
            />
            {/* <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={[
                        {
                            flexGrow: 0,
                            // flexShrink: 1,
                            flexBasis: 'auto',
                            marginRight: 5,
                        },
                        classes.headerSecondary,
                    ]}
                >
                    Products
                </Text>
                <Icon
                    name='add-outline'
                    onPress={() => setShowModal(true)}
                    color='yellow'
                    size={16}
                    iconStyle={{ fontWeight: 700 }}
                />
                
            </View> */}

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

            <PopUpModal
                visible={showModal || featured}
                onRequestClose={closeModal}
            >
                <ProductForm
                    onComplete={onProductFormSubmitted}
                    onDelete={() => onDelete(featured._id)}
                    existingProduct={featured}
                />
            </PopUpModal>
        </View>
    )
}