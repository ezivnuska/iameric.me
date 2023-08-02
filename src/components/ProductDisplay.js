import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    ModalContainer,
    ProductForm,
    ProductList,
} from '.'
import {
    PlusCircleOutlined,
} from '@ant-design/icons'
import { AppContext } from '../AppContext'
import axios from 'axios'

const ProductDisplay = () => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state

    const [items, setItems] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        axios
            .get(`/api/products/${user._id}`)
            .then(({ data }) => {
                setItems(data.items)
            })
            .catch(err => console.log('Error getting products:', err))
    }

    const onDelete = id => {
        axios
            .delete('/api/products/delete', { data: { id } })
            .then(({ data }) => setItems(items.filter(item => item._id !== data.item._id)))
            .catch(err => console.log('Error deleting product:', err))
    }

    const onModalSubmitted = item => {
        setItems([item, ...items])
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.displayHeader}>
                
                <Text style={styles.title}>Products</Text>
                
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <PlusCircleOutlined
                            style={{ fontSize: 20 }}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            {items && items.length
                ? (
                    <ProductList
                        deleteItem={onDelete}
                        update={getProducts}
                        items={items}
                    />
                ) : <Text>No products to display.</Text>}

            <ModalContainer
                animationType='slide'
                presentationStyle='fullScreen'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                label='Add Product'
            >
                <ProductForm
                    onComplete={onModalSubmitted}
                />
            </ModalContainer>
        </View>
    )
}

export default ProductDisplay

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,  
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
    },
    buttons: {
        flex: 1,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
    },
    headerButton: {
        marginVertical: 4,
        marginHorizontal: 7,
    },
})