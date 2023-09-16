import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    CenteredView,
    MenuItem,
    ModalContainer,
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'
import main from '../styles/main'
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

    const addToCart = item => {
        dispatch({ type: 'ADD_TO_CART', item, vendor: vendorId })
        setFeatured(null)
    }
    
    return (
        <View stye={styles.container}>
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
                ) : <Text style={main.text}>No products to display.</Text>}

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={featured}
                closeModal={() => setFeatured(null)}
                label={featured && featured.title ? featured.title : null}
            >
                <ProductDetails product={featured} onOrder={addToCart} />
            </ModalContainer>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        height: '100%',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        borderWidth: 1,
        backgroundColor: 'blue',
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