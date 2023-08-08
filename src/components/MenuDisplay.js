import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    Cart,
    Menu,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

const MenuDisplay = ({ vendorId }) => {
    
    const {
        dispatch,
        state,
        cart,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getItems()
    }, [])
    
    const updateStatus = text => dispatch({ type: 'SET_STATUS', status: text })

    const getItems = async () => {
        
        const { data } = await axios.
            get(`/api/products/${vendorId}`)

        setLoading(false)

        if (!data) {
            console.log('Error loading menu items', err)
            return null
        }

        setItems(data.items)
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

    return (
        <View style={styles.container}>
            {loading
                ? <ActivityIndicator size='small' />
                : (items && items.length)
                    ? (
                        <Menu
                            vendor={vendorId}
                            items={items}
                        />
                    )
                    : <Text>No products to display.</Text>
            }
        </View>
    )
}

export default MenuDisplay

const styles = StyleSheet.create({
    container: {

    },
})