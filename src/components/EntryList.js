import React from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { EntryListItem } from '../components'

const EntryList = ({ deleteItem, items }) => (
    <View style={styles.container}>
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
    </View>
)

export default EntryList

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 0,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    list: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
    },
    deleted: {
        opacity: 0.3,
    },
})