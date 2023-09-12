import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    MenuItem,
    ModalContainer,
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles/main'
import axios from 'axios'

const Menu = ({ vendorId }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(false)
    const [featured, setFeatured] = useState(null)

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        
        setLoading(true)
        
        const { data } = await axios.
            get(`/api/products/${vendorId}`)

        if (!data) {
            console.log('Error loading menu items', err)
            return null
        }
        
        setItems(data.items)
        setLoading(false)
    }

    const removeItemById = id => {
        let indexToRemove = null
        items.map((item, i) => {
            if (item._id === id) indexToRemove = i
        })
        if (indexToRemove === null) return
        
        const updatedItems = items.filter((item, i) => i !== indexToRemove)
        
        setItems(updatedItems)
    }

    const deleteItem = id => {

        removeItemById(id)
        axios
            .delete('/api/products/delete', { data: { id } })
            .then(({ data }) => {
                // const { entry } = data
                updateStatus('Product deleted.')
            })
            .catch(err => {
                console.log('Error deleting product.', err)
                updateStatus('Error deleting product.')
            })
    }

    const addToCart = item => {
        dispatch({ type: 'ADD_TO_CART', item, vendor: vendorId })
        setFeatured(null)
    }
    
    return (
        <View style={styles.container}>
            {(items && items.length)
                ? (
                    <FlatList
                        data={items}
                        keyExtractor={item => `product-${item._id}`}
                        // style={styles.list}
                        renderItem={({ item }) => (
                            <MenuItem
                                item={item}
                                onPress={() => setFeatured(item)}
                            />
                        )}
                    />
                ) : <Text style={defaultStyles.text}>No products to display.</Text>}

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={featured}
                closeModal={() => setFeatured(null)}
                label={featured && featured.title ? featured.title : null}
            >
                {featured && <ProductDetails product={featured} onOrder={addToCart} />}
            </ModalContainer>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    heading: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 10,
    },
    list: {
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'pink',
    },
})