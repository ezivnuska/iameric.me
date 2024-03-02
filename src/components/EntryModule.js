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
    ForumList,
} from '.'
import { AppContext } from '../AppContext'
import { deleteEntryWithId, loadEntries } from '../utils/data'

export default () => {
    
    const {
        dispatch,
        entries,
        isLandscape,
        loading,
    } = useContext(AppContext)

    const [items, setItems] = useState(null)

    useEffect(() => {
        if (!entries) fetchEntries()
        else setItems(entries)
    }, [])

    useEffect(() => {
        if (entries && items) {
            if (entries.length !== items.length) setItems(entries)
        } else if (entries) {
            setItems(entries)
        }
    }, [entries])

    const fetchEntries = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'loading forum...' })

        const entriesLoaded = await loadEntries()
        
        if (!entriesLoaded) {
            console.log('Error loading forum entries')
        } else {
            dispatch({ type: 'SET_ENTRIES', entries: entriesLoaded })
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

    if (loading) return <LoadingView />

    return items && items.length
        ? (
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                }}
            >
                <ForumList
                    horizontal={isLandscape}
                    items={items}
                    onDelete={id => removeItemById(id)}
                />
            </View>
        ) : (
            <ThemedText align='left'>
                No entries yet.
            </ThemedText>
        )
}