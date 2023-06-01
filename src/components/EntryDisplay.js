import React, { useContext, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'
import {
    EntryList,
    FeedbackForm,
} from './'
import { AppContext } from '../AppContext'
import axios from 'axios'

const EntryDisplay = () => {
    
    const {
        dispatch,
        state,
    } = useContext(AppContext)

    const { entries, user } = state
    const [items, setItems] = useState(entries || [])
    const [loading, setLoading] = useState(false)
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        if (!entries || !entries.length) getEntries()
    }, [])

    // useEffect(() => {
    //     if (entries) setItems(entries)
    // }, [entries])

    useEffect(() => {
        if (refetch) {
            setRefetch(false)
            setItems(entries)
        }
    }, [entries])
    
    const updateStatus = text => dispatch({ type: 'SET_STATUS', status: text })

    const getEntries = () => {

        console.log('loading entries...')
        setLoading(true)
        axios
            .get('/api/entries')
            .then(({ data }) => {
                console.log('entries loaded.')
                setLoading(false)
                dispatch({ type: 'SET_ENTRIES', entries: data.entries })
                setItems(data.entries)
            })
            .catch(err => {
                console.log('Error loading entries', err)
                dispatch({ type: 'SET_STATUS', status: 'Error loading entries.' })
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
                updateStatus('Entry deleted.')
            })
            .catch(err => {
                console.log('Error deleting entry', err)
                updateStatus('Error deleting entry.')
            })
    }

    const addEntry = entry => {
        setItems({ entry, ...items })
        setRefetch(true)
        dispatch({ type: 'NEW_ENTRY', entry })
    }

    return (
        <View style={styles.container}>
            <FeedbackForm
                addEntry={addEntry}
                updateStatus={updateStatus}
            />

            {loading ? <ActivityIndicator size='large' /> : (
                <EntryList
                    items={items}
                    deleteItem={deleteItem}
                />
            )}
        </View>
    )
}

export default EntryDisplay

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: 'blue',
    },
})