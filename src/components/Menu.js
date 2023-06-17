import React, { useState } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { MenuItem } from '.'

const Menu = ({ items }) => {

    const [selected, setSelected] = useState()
    
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