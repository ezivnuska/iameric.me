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
    ModalContent,
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'
import main from '../styles/main'

const Menu = ({ vendor }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    const [featured, setFeatured] = useState(null)
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        if (vendor.products) setItems(vendor.products)
    }, [])

    const addToCart = item => {
        setLoading(true)
        dispatch({ type: 'ADD_TO_CART', item, vendor: vendor._id })
        setFeatured(null)
        setLoading(false)
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

            <ModalContent
                visible={featured}
                onRequestClose={() => setFeatured(null)}
                label={featured && featured.title ? featured.title : null}
            >
                <ProductDetails loading={loading} product={featured} onOrder={addToCart} />
            </ModalContent>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        height: '100%',
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