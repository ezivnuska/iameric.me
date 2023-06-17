import React, { useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    ProductList,
} from '.'

const Menu = () => {

    const [selected, setSelected] = useState()
    
    return (
        <View style={styles.container}>
            <ProductList />
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ccc',
    },
    item: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})