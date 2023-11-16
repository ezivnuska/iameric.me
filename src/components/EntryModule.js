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
import axios from 'axios'
import defaultStyles from '../styles/main'

export default () => {
    
    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { entries, user } = state
    const [items, setItems] = useState(entries)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!items) getEntries()
        else if (entries) setItems(entries)
    }, [])

    useEffect(() => {
        if (entries) setItems(entries)
    }, [entries])

    const getEntries = async () => {
        console.log('loading entries...')
        setLoading(true)
        await axios
            .get('/api/entries')
            .then(({ data }) => {
                console.log('entries loaded.')
                setLoading(false)
                dispatch({ type: 'SET_ENTRIES', entries: data.entries })
            })
            .catch(err => {
                console.log('Error loading entries', err)
            })
    }

    const removeItemById = id => {
        let indexToRemove = null
        items.map((item, i) => {
            if (item._id === id) indexToRemove = i
        })
        if (indexToRemove === null) return
        
        const updatedEntries = items.filter((item, i) => {
            return i !== indexToRemove
        })
        
        dispatch({ type: 'SET_ENTRIES', entries: updatedEntries })
        setItems(updatedEntries)
    }

    const deleteItem = id => {
        removeItemById(id)
        axios
            .delete('/api/entry/delete', { data: { id } })
            .then(({ data }) => {
                // const { entry } = data
                console.log('Entry deleted.')
            })
            .catch(err => {
                console.log('Error deleting entry', err)
            })
    }

    const addEntry = entry => {
        // setItems({ entry, ...items })
        dispatch({ type: 'NEW_ENTRY', entry })
    }

    return (
        <View
            style={{
                marginTop: 10,
                marginBottom: 20,
            }}
        >
            <FeedbackForm
                addEntry={addEntry}
            />
            <Text style={defaultStyles.heading}>Comments</Text>
            {items && items.length ? (
                <EntryList
                    entries={items}
                    deleteItem={deleteItem}
                />
            ) : <Text>No comments yet.</Text>}
        </View>
    )
}