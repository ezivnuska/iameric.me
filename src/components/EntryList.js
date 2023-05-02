import React from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { EntryListItem } from '../components'

const EntryList = ({ entries, deleteEntry }) => {

    return entries.length ? (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={entries}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                    <EntryListItem entry={item} deleteEntry={deleteEntry} />
                )} 
            />
        </View>
    ) : null
}

export default EntryList

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    list: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
    },
})