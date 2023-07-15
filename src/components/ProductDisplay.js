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

const ProductDisplay = ({ vendor, ...props }) => {

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
            .get(`/api/products/${vendor._id}`)
            .then(({ data }) => {
                console.log('DATA', data.items)
                setItems(data.items)
            })
            .catch(err => console.log('Error:', err))
    }

    const onDelete = id => {
        axios
            .delete('/api/products/delete', { data: { id } })
            .then(({ data }) => {
                const { item } = data
                console.log('item deleted:', item)
                setItems(items.filter(i => i._id !== item._id))
            })
            .catch(err => console.log('Error deleting product', err))
    }

    const onModalSubmitted = item => {
        setItems([item, ...items])
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.displayHeader}>
                <Text style={styles.title}>Products</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <PlusCircleOutlined
                            style={{ fontSize: 22 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ProductList
                deleteItem={onDelete}
                items={items}
            />

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
            >
                <ProductForm
                    addItem={onModalSubmitted}
                />
            </ModalContainer>
        </View>
    )
}

export default ProductDisplay

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,  
    },
    displayHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    title: {
        // flex: 1,
        // flexBasis: 'auto',
        // flexGrow: 0,
        // flexShrink: 1,
        fontSize: 24,
        // lineHeight: 30,
        // borderWidth: 1,
        // borderColor: 'green',
    },
    buttonContainer: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'stretch',
        // lineHeight: 60,
        // borderWidth: 1,
        // borderStyle: 'dotted',
        // borderColor: 'purple',
    },
    headerButton: {
        alignContent: 'center',
        flex: 1,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        // lineHeight: 30,
        height: 30,
        // width: 30,
        // borderWidth: 1,
        // borderColor: 'red',
    },
})