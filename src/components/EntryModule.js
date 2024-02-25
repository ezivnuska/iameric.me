import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    ThemedText,
    EntryListItem,
    FeedbackForm,
    LoadingView,
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import { deleteEntryWithId, loadEntries } from '../utils/data'

export default ({ navigation }) => {
    
    const {
        dispatch,
        entries,
        loading,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)

    useEffect(() => {
        if (!entries) getEntries()
        else setItems(entries)
    }, [])

    useEffect(() => {
        if (entries && entries.length !== items.length) setItems(entries)
    }, [entries])

    const getEntries = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'loading forum...' })

        const entriesLoaded = await loadEntries()
        
        if (!entriesLoaded) {
            console.log('Error loading forum entries')
        } else if (!entriesLoaded.length) {
            console.log('No forum entries yet.')
            setItems([])
        } else {
            dispatch({ type: 'SET_ENTRIES', entries: entriesLoaded })   
            setItems(entriesLoaded)
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const removeItemById = async id => {

        dispatch({ type: 'SET_LOADING', loading: 'Deleting entry...' })

        const entryDeleted = await deleteEntryWithId(id)
        
        if (!entryDeleted) {
            console.log('could not delete entry')
        } else {
            setItems(items.filter(item => item._id !== id))
            dispatch({ type: 'DELETE_ENTRY', id: entryDeleted._id })
        }
        
        dispatch({ type: 'SET_LOADING', loading: null })
    }

    const addItem = item => setItems([item, ...items])

    return items && items.length
        ? (
            <FlatList
                data={items}
                keyExtractor={(item, index) => `${index}-entry-${item._id}`}
                renderItem={({ item }) => (
                    <EntryListItem
                        entry={item}
                        onDelete={removeItemById}
                    />
                )} 
            />
        ) : (
            <ThemedText
                style={{
                    marginLeft: 10,
                }}
            >
                No entries yet.
            </ThemedText>
        )
}