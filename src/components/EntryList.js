import React from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { EntryListItem } from '../components'

const EntryList = ({ entries, deleteEntry }) => {

    return entries ? (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={entries}
                keyExtractor={(item, index) => 'key' + index}
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
    },
    list: {
        flex: 1,
        alignSelf: 'center',
    },
})