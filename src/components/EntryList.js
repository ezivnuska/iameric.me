import React, { useContext, useEffect } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { EntryListItem } from '../components'
import { AppContext } from '../AppContext'

const EntryList = ({ entries, deleteEntry }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)
    
    // useEffect(async () => {

    // }, [])

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