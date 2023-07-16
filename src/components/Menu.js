import React, { useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { MenuItem } from '.'
import axios from 'axios'

const Menu = ({ vendorId }) => {

    const [selected, setSelected] = useState()
    const [items, setItems] = useState([])
    
    const getProducts = () => {
        axios
            .get(`/api/products/${vendorId}`)
            .then(({ data }) => setItems(data.items))
            .catch(err => console.log('Error getting products:', err))
    }
    
    useEffect(() => {
        getProducts()
    }, [])
    
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <MenuItem item={item} />} 
            />
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {

    },
})