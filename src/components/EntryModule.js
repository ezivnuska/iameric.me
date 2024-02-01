import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    Text,
    View,
} from 'react-native'
import {
    EntryListItem,
    FeedbackForm,
    LoadingView,
} from '.'
import { AppContext } from '../AppContext'
import { deleteEntryWithId, loadEntries } from '../utils/data'
import classes from '../styles/classes'
import { useTheme } from 'react-native-paper'

export default ({ navigation }) => {

    const theme = useTheme()
    
    const {
        dispatch,
        entries,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(null)
    const [items, setItems] = useState(null)

    useEffect(() => {
        if (!entries) getEntries()
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
            
            <Text style={classes.pageTitle}>
                Forum
            </Text>

            <FeedbackForm />
            
            {loading
                ? <LoadingView label={loading} />
                : items && items.length
                    ? (
                        <FlatList
                            data={entries.reverse()}
                            keyExtractor={(item, index) => `${index}-entry-${item._id}`}
                            renderItem={({ item }) => (
                                <EntryListItem
                                    entry={item}
                                    onDelete={removeItemById}
                                />
                            )} 
                        />
                    ) : (
                        <Text
                            style={[
                                classes.textDefault,
                                { color: theme?.colors.textDefault },
                            ]}
                        >
                            No entries yet.
                        </Text>
                    )
            }

        </View>
    )
}