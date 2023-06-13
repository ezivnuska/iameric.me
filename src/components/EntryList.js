import React from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { EntryListItem } from '../components'

const EntryList = ({ deleteItem, items }) => (
    <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
            <EntryListItem
                entry={item}
                onDelete={deleteItem}
            />
        )} 
    />
)

export default EntryList

const styles = StyleSheet.create({
    list: {

    },
})