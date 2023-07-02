import React from 'react'
import {
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { Entry } from '.'

const EntryList = ({ items, deleteItem }) => (
    <FlatList
        data={items}
        keyExtractor={(item, index) => 'entry' + index}
        renderItem={({ item, index }) => (
            <TouchableOpacity
                onPress={() => deleteItem(index)}
            >
                <Entry entry={item} />
            </TouchableOpacity>
        )}
    />
)

export default EntryList