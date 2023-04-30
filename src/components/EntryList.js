import React from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { EntryListItem } from '../components'

const EntryList = ({ entries, deleteEntry }) => {

    return (
        <View style={styles.container}>
            {
                entries ? (
                    <FlatList
                        style={styles.list}
                        data={entries}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={({ item }) => (
                            <EntryListItem entry={item} deleteEntry={deleteEntry} />
                        )} 
                    />
                ) : (
                    <ActivityIndicator size='small' />
                )
            }
        </View>
    )
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