import React, { useContext, useEffect, useRef } from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native-web'
import axios from 'axios'

import { EntryList, FeedbackForm } from './'
import { AppContext } from '../AppContext'

const EntryDisplay = ({ navigation }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { entries } = state
    const mounted = useRef(false)

    
    const getEntries = () => {
        axios
            .get('/api/entries')
            .then(({ data }) => {
                dispatch({ type: 'SET_ENTRIES', entries: data.entries })
            })
    }

    useEffect(() => {
        getEntries()
    }, [])

    const deleteEntry = id => {
        axios
            .post('/api/entry/delete', { id })
            .then(result => dispatch({ type: 'ENTRY_DELETE', entryId: id }))
            .catch(err => console.log('Error deleting entry', err))
    }

    return entries ? (
        <View style={styles.container}>
            <FeedbackForm />
            <EntryList entries={entries} deleteEntry={deleteEntry} />
        </View>
    ) : <Text>Loading...</Text>
}

export default EntryDisplay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexBasis: 'auto',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
})