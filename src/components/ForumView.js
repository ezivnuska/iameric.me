import React, { useEffect } from 'react'
import {
    View,
} from 'react-native'
import {
    ForumList,
    EmptyStatus,
} from '.'
import {
    useApp,
    useForum,
} from '@context'
import { deleteEntryWithId } from '@utils/forum'
import axios from 'axios'

export default () => {
    
    const { landscape } = useApp()
    const {
        deleteEntry,
        entries,
        setEntries,
        setForumLoading,
    } = useForum()

    useEffect(() => {
        const init = async () => {
            setForumLoading(true)
            const { data } = await axios.get('/api/entries')
            setForumLoading(false)
            if (data && data.entries) setEntries(data.entries)
        }
        init()
    }, [])

    const removeEntry = async id => {
        setForumLoading(true)
        await deleteEntryWithId(id)
        setForumLoading(false)
        deleteEntry(id)
    }

    return (
        <View style={{ flex: 1, flexGrow: 1 }}>
            {entries
                ? (
                    <ForumList
                        items={entries}
                        onDelete={removeEntry}
                    />
                )
                : <EmptyStatus status='No entries yet.' />
            }
        </View>
    )
}