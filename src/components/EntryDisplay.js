import React, { useContext, useEffect, useState, useRef } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import axios from 'axios'

import {
    EntryList,
    FeedbackForm,
    StatusDisplay,
} from './'
import { AppContext } from '../AppContext'

const EntryDisplay = ({ navigation }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { entries } = state
    const [status, setStatus] = useState(null)
    
    const getEntries = () => {
        setStatus('Loading entries...')
        axios
            .get('/api/entries')
            .then(({ data }) => {
                const { entries } = data
                setStatus('Entries loaded.', entries)
                dispatch({ type: 'SET_ENTRIES', entries })
            })
            .catch(err => {
                setStatus('Error loading entries.')
            })
    }

    useEffect(() => {
        console.log('Entries loaded')
        getEntries()
    }, [])

    const deleteEntry = id => {
        setStatus('Deleting entry...')
        axios
            .post('/api/entry/delete', { id })
            .then(result => {
                setStatus('Entry deleted.')
                dispatch({ type: 'ENTRY_DELETE', entryId: id })
            })
            .catch(err => {
                setStatus('Error deleting entry.')
                console.log('Error deleting entry', err)
            })
    }

    return entries ? (
        <View style={styles.container}>
            {status ? <StatusDisplay status={status} /> : null}
            <FeedbackForm updateStatus={text => setStatus(text)} />
            <EntryList entries={entries} deleteEntry={deleteEntry} />
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