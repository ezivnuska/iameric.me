import React, { useContext, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import {
    MenuItem,
    ModalContainer,
    ProductDetails,
} from '.'
import { AppContext } from '../AppContext'

const Menu = ({ items }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const [featured, setFeatured] = useState(null)

    const addToCart = item => {
        dispatch({ type: 'ADD_TO_CART', item })
        setFeatured(null)
    }
    
    return (
        <View style={styles.container}>
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
})