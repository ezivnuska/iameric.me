import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    AddButton,
    DefaultText,
    ModalContainer,
    PanelView,
    ProductForm,
    ProductList,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'
import main from '../styles/main'

const ProductDisplay = () => {

    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { user } = state

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [featured, setFeatured] = useState(null)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        setLoading(true)
        const { data } = await axios.
            get(`/api/products/${user._id}`)
        
        if (!data) return console.log('Error getting products:')
        
        setLoading(false)

        setItems(data.items)
    }

    const onDelete = async id => {
        const { data } = await axios.
            delete('/api/products/delete', { data: { id } })
        
        if (!data) {
            console.log('Error deleting product')
            return
        }

        setItems(items.filter(item => item._id !== data.item._id))
    }

    const updateItems = product => {
        const products = items.map((item, index) => {
            if (product._id === item._id) return product
            else return item
        })

        setItems(products)
    }

    const onModalSubmitted = item => {
        updateItems(item)
        setFeatured(null)
    }

    return (
        <View>
            <View style={[styles.displayHeader, main.paddedH]}>
                
                <Text style={[main.heading, main.paddedV]}>Products</Text>
                <AddButton iconStyle={styles.headerButton} onPress={() => setFeatured(true)} />
            </View>

            {loading
            ? <Text style={main.text}>Loading products...</Text>
            : items && items.length
                ? (
                    <PanelView type='expanded'>
                        <ProductList
                            items={items}
                            onPress={item => setFeatured(item)}
                            />
                    </PanelView>
                ) : <Text style={main.text}>No products to display.</Text>}

            <ModalContainer
                animationType='slide'
                presentationStyle='fullScreen'
                transparent={false}
                visible={featured}
                closeModal={() => setFeatured(null)}
                label={`${featured && featured._id ? 'Edit' : 'Add'} Product`}
            >
                <ProductForm
                    onComplete={onModalSubmitted}
                    onDelete={onDelete}
                    product={featured}
                />
            </ModalContainer>
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