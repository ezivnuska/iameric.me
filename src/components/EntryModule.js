import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    View,
} from 'react-native'
import {
    DefaultText,
    EntryListItem,
    FeedbackForm,
    LoadingView,
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
    const [items, setItems] = useState(null)

    useEffect(() => {
        getEntries()
    }, [])

    const getEntries = async () => {

        setLoading('loading feedback...')

        const entriesLoaded = await loadEntries()
        
        if (!entriesLoaded) {
            console.log('could not load entries')
            return
        }

        setItems(entriesLoaded)
        dispatch({ type: 'SET_ENTRIES', entries: entriesLoaded })

        setLoading(null)
    }

    const removeItem = id => {
        setItems(items.filter(item => item._id !== id))
    }

    const removeItemById = async id => {

        setLoading('Deleting entry...')

        const entryDeleted = await deleteEntryWithId(id)
        
        if (!entryDeleted) {
            console.log('could not delete entry')
            return
        }
        
        removeItem(id)
        dispatch({ type: 'DELETE_ENTRY', id: entryDeleted._id })

        setLoading(false)
    }

    return (
        <View
            style={{
                paddingBottom: 10,
            }}
        >
            
            <DefaultText style={classes.pageTitle}>
                Forum
            </DefaultText>

            <FeedbackForm />
            
            {loading
                ? <LoadingView label={loading} />
                : items && items.length
                    ? (
                        <FlatList
                            data={entries}
                            keyExtractor={(item, index) => `${index}-entry-${item._id}`}
                            renderItem={({ item }) => (
                                <EntryListItem
                                    entry={item}
                                    onDelete={removeItemById}
                                />
                            )} 
                        />
                    ) : <DefaultText>No entries yet.</DefaultText>
            }

        </View>
    )
}