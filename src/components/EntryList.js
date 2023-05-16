import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View,
} from 'react-native'
import { EntryListItem } from '../components'
import axios from 'axios'
import { AppContext } from '../AppContext'

const EntryList = () => {
    
    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { entries } = state

    const [items, setItems] = useState(entries)
    const [loaded, setLoaded] = useState(false)
    
    const updateEntries = loadedEntries => {
        if (!loaded) setLoaded(true)
        dispatch({ type: 'SET_ENTRIES', entries: loadedEntries })
    }

    const getEntries = () => {
        axios
            .get('/api/entries')
            .then(({ data }) => updateEntries(data.entries))
            .catch(err => {
                console.log('Error loading entries', err)
                dispatch({ type: 'SET_STATUS', status: 'Error loading entries.' })
            })
    }

    useEffect(() => {
        console.log('Entries loading...')
        getEntries()
    }, [])

    useEffect(() => {
        if (entries) setItems(entries)
    }, [entries])

    const removeItemById = id => {
        setItems(items.filter((item, index) => item._id !== id))
    }

    const setItemForDeletion = id => {
        setItems(
            items.map(item => {
                return item._id === id ? ({
                    ...item,
                    setForDeletion: true,
                }) : item
        }))
    }

    const deleteEntry = id => {
        dispatch({ type: 'SET_STATUS', status: 'Deleting entry...', id })
        setItemForDeletion(id)
        axios
            .post('/api/entry/delete', { id })
            .then(result => {
                dispatch({ type: 'SET_STATUS', status: 'Entry deleted.', result })
                dispatch({ type: 'ENTRY_DELETE', entryId: id })
                removeItemById(id)
            })
            .catch(err => {
                dispatch({ type: 'SET_STATUS', status: 'Error deleting entry.' })
                console.log('Error deleting entry', err)
            })
    }

    return (items && items.length) ? (
        <View style={styles.container}>
            {loaded ? (
                <FlatList
                    style={styles.list}
                    data={items}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({ item }) => (
                        <EntryListItem
                            entry={item}
                            deleteEntry={() => deleteEntry(item._id)}
                            styleProps={[item.setForDeletion ? styles.deleted : null]}
                        />
                    )} 
                />
            ) : <ActivityIndicator size='small' />}
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