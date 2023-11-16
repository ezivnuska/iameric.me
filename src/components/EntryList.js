import React from 'react'
import {
    FlatList,
} from 'react-native'
import { EntryListItem } from '../components'

export default ({ deleteItem, entries }) => (
    <FlatList
        data={entries}
        keyExtractor={(item, index) => `${index}-entry-${item._id}`}
        renderItem={({ item }) => (
            <EntryListItem
                entry={item}
                onDelete={deleteItem}
            />
        )} 
    />
)