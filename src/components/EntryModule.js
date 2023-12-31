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
import { deleteEntryWithId, loadEntries } from '../utils/data'
import classes from '../styles/classes'

export default ({ navigation }) => {
    
    const {
        dispatch,
        entries,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (!entries) init()
    }, [])

    const init = async () => {
        setLoading('Loading entries...')

        const entriesLoaded = await loadEntries()
        
        if (entriesLoaded) {
            dispatch({ type: 'SET_ENTRIES', entries: entriesLoaded })
        }

        setLoading(null)
    }

    const removeItemById = async id => {

        setLoading('Deleting entry...')

        const entryDeleted = await deleteEntryWithId(id)
        
        if (entryDeleted) {
            dispatch({ type: 'DELETE_ENTRY', id: entryDeleted._id })
        }
        
        setLoading(false)
    }

    return (
        <View>
            
            <Text style={classes.pageTitle}>
                Forum
            </Text>

            <FeedbackForm />
            
            {entries && entries.length
                ? (
                    <EntryList
                        entries={entries.reverse()}
                        deleteItem={removeItemById}
                    />
                ) : (
                    <Text style={classes.textDefault}>No entries yet.</Text>
                )
            }

        </View>
    )
}