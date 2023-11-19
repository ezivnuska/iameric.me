import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    EntryList,
    FeedbackForm,
} from '.'
import { AppContext } from '../AppContext'
import defaultStyles from '../styles/main'
import { deleteEntryWithId, loadEntries } from '../utils/data'

export default () => {
    
    const {
        dispatch,
        entries,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!entries) init()
    }, [])

    const init = async () => {
        setLoading(true)

        const entriesLoaded = await loadEntries()
        
        if (entriesLoaded) {
            dispatch({ type: 'SET_ENTRIES', entries: entriesLoaded })
        }

        setLoading(false)
    }

    const removeItemById = async id => {

        setLoading(true)

        const entryDeleted = await deleteEntryWithId(id)

        if (entryDeleted) {
            dispatch({ type: 'DELETE_ENTRY', id: entryDeleted._id })
        }

        setLoading(false)
    }

    const renderEntryList = () => loading
        ? <Text>Loading...</Text>
        : entries
            ? (
                <EntryList
                    entries={entries}
                    deleteItem={removeItemById}
                />
            )
            : <Text>No entries to display.</Text>

    return (
        <View
            style={{
                marginTop: 10,
                marginBottom: 20,
            }}
        >
            <FeedbackForm
                addEntry={entry => dispatch({ type: 'NEW_ENTRY', entry })}
            />
            
            <Text style={defaultStyles.heading}>Comments</Text>
            
            {renderEntryList()}

        </View>
    )
}