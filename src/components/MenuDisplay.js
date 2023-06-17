import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'
import {
    MenuList,
} from '.'
import { AppContext } from '../AppContext'
import axios from 'axios'

const MenuDisplay = ({ vendorId }) => {
    
    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getItems()
    }, [])
    
    const updateStatus = text => dispatch({ type: 'SET_STATUS', status: text })

    const getItems = () => {

        console.log('loading menu items...')
        setLoading(true)
        axios
            .get('/api/products', { vendorId })
            .then(({ data }) => {
                console.log('menu items loaded.')
                setLoading(false)
                // dispatch({ type: 'SET_ENTRIES', entries: data.entries })
                setItems(data.items)
            })
            .catch(err => {
                console.log('Error loading menu items', err)
                dispatch({ type: 'SET_STATUS', status: 'Error loading menu items.' })
            })
    }

    const removeItemById = id => {
        let indexToRemove = null
        items.map((item, i) => {
            if (item._id === id) indexToRemove = i
        })
        if (indexToRemove === null) return
        
        const updatedItems = items.filter((item, i) => i !== indexToRemove)
        
        // dispatch({ type: 'SET_ENTRIES', entries: updatedEntries })
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

    const addItem = item => {
        setItems({ item, ...items })
        // dispatch({ type: 'NEW_MENU_ITEM', item })
    }

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size='large' /> : (
                <MenuList
                    items={items}
                    deleteItem={deleteItem}
                />
            )}
        </View>
    )
}

export default MenuDisplay

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: 'blue',
    },
})