import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    ForumHeader,
    ForumList,
} from './components'
import { useForum } from '@forum'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { deleteEntryWithId } from '@utils/forum'

export default () => {

    const {
        addEntry,
        entries,
        deleteEntry,
        setForumLoading,
    } = useForum()
    const { closeModal } = useModal()
    const { socket } = useSocket()

    const [ sortedThreads, setSortedThreads ] = useState([])

    useEffect(() => {
        socket.on('new_entry', addEntry)
        socket.on('deleted_entry', deleteEntry)
    }, [])

    useEffect(() => {
        if (entries) {
            const threads = getSortedThreads()
            setSortedThreads(threads)
        }
    }, [entries])

    const getThreadIds = () => {
        let ids = []
        entries.map(entry => {
            if (ids.indexOf(entry._id) < 0) {
                ids.push(entry._id)
            }
        })
        return ids
    }

    const getSortedThreads = () => {
        const threadIds = getThreadIds()
        const threads = []
        threadIds.map(threadId => {

            const thread = entries.filter(entry => (entry.threadId && entry.threadId === threadId) || (!entry.threadId && entry._id === threadId))
            
            if (thread.length) {
                threads.push(thread.reverse())
            }
        })
        return threads
    }

    const removeEntry = async id => {
        setForumLoading(true)
        await deleteEntryWithId(id)
        setForumLoading(false)
        socket.emit('entry_deleted', id)
        deleteEntry(id)
        closeModal()
    }

    const renderThread = (items, index) => (
        <View
            key={`thread-${index}`}
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 12,
            }}
        >
            <ForumList
                entries={items}
                onDelete={removeEntry}
            />
        </View>
    )

    const renderThreads = threads => {
        return (
            <View style={{ gap: 7 }}>
                {threads.map((thread, index) => renderThread(thread, index))}
            </View>)
    }
    
    return (
        <View style={{ flex: 1 }}>

            <ForumHeader />

            {entries.length
                ? renderThreads(sortedThreads)
                : <ThemedText>No entries yet.</ThemedText>
            }
                
        </View>
    )
}