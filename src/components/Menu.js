import React, { useContext, useState } from 'react'
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

const Menu = ({ items, vendor }) => {
    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const [featured, setFeatured] = useState(null)

    const addToCart = item => {
        dispatch({ type: 'ADD_TO_CART', item, vendor })
        setFeatured(null)
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Menu</Text>
            <FlatList
                data={items}
                keyExtractor={item => `product-${item._id}`}
                renderItem={({ item }) => (
                    <MenuItem
                        item={item}
                        onPress={() => setFeatured(item)}
                    />
                )} 
            />

            <ModalContainer
                animationType='slide'
                transparent={false}
                visible={featured}
                closeModal={() => setFeatured(null)}
                label={featured ? featured.title : null}
            >
                {featured ? (
                    <ProductDetails
                        product={featured}
                        onOrder={addToCart}
                    />
                ) : null }
            </ModalContainer>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {

    },
    heading: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 10,
    }
})