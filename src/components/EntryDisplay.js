import React, { useContext, useEffect, useState, useRef } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'
import axios from 'axios'

import {
    EntryList,
    FeedbackForm,
} from './'
import { AppContext } from '../AppContext'

const EntryDisplay = ({ navigation }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { entries } = state
    const [items, setItems] = useState(entries)
    const [loaded, setLoaded] = useState(false)
    
    const getEntries = () => {
        // dispatch({ type: 'SET_STATUS', status: 'Loading entries...' })
        axios
            .get('/api/entries')
            .then(({ data }) => {
                // dispatch({ type: 'SET_STATUS', status: 'Entries loaded.' })
                setItems(data.entries)
                setLoaded(true)
                dispatch({ type: 'SET_ENTRIES', entries: data.entries })
            })
            .catch(err => {
                dispatch({ type: 'SET_STATUS', status: 'Error loading entries.' })
            })
    }

    useEffect(() => {
        setLoaded(false)
        console.log('Entries loaded')
        getEntries()
    }, [])

    useEffect(() => {
        setItems(entries)
    }, [entries])

    const removeItemById = id => {
        setItems(items.filter((item, index) => item._id !== id))
    }

    const deleteEntry = id => {
        dispatch({ type: 'SET_STATUS', status: 'Deleting entry...' })
        removeItemById(id)
        axios
            .post('/api/entry/delete', { id })
            .then(result => {
                dispatch({ type: 'SET_STATUS', status: 'Entry deleted.' })
                dispatch({ type: 'ENTRY_DELETE', entryId: id })
            })
            .catch(err => {
                dispatch({ type: 'SET_STATUS', status: 'Error deleting entry.' })
                console.log('Error deleting entry', err)
            })
    }

    const updateStatus = text => dispatch({ type: 'SET_STATUS', status: text })

    return items ? (
        <View style={styles.container}>
            <FeedbackForm updateStatus={updateStatus} />
            {loaded ? (
                <EntryList entries={items} deleteEntry={deleteEntry} />
            ) : (
                <ActivityIndicator size='small' />
            )}
        </View>
    ) : null
}

export default EntryDisplay

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: 'blue',
    },
})