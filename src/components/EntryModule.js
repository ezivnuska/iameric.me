import React, { useContext, useEffect, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    LoadingView,
    ForumList,
    EmptyStatus,
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

    // const [items, setItems] = useState(null)

    useEffect(() => {
        if (!entries) loadEntries(dispatch)
    }, [])

    // useEffect(() => {
    //     if (entries && items) {
    //         if (entries.length !== items.length) setItems(entries)
    //     } else if (entries) {
    //         setItems(entries)
    //     }
    // }, [entries])

    const removeItemById = async id => {
        console.log('removing item should not be necessary.')
        // dispatch({ type: 'SET_LOADING', loading: 'Deleting entry...' })

        // const entryDeleted = await deleteEntryWithId(id)
        
        // if (!entryDeleted) {
        //     console.log('could not delete entry')
        // } else {
        //     setItems(items.filter(item => item._id !== id))
        //     dispatch({ type: 'DELETE_ENTRY', id: entryDeleted._id })
        // }
        
        // dispatch({ type: 'SET_LOADING', loading: null })
    }

    // const addItem = item => setItems([item, ...items])

    if (loading) return <LoadingView />

    return entries && entries.length
        ? (
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                }}
            >
                <ForumList
                    horizontal={isLandscape}
                    items={entries}
                    onDelete={id => removeItemById(id)}
                />
            </View>
        ) : <EmptyStatus status='No entries yet.' />
}