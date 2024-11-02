import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ThemedText } from '@components'
import {
    ForumHeader,
    ForumList,
    ForumModal,
    useForum,
} from '.'
import { useSocket } from '@socket'
import { deleteEntryWithId } from './utils'

export default () => {

    const {
        forumModal,
        closeForumModal,
        setForumModal,
        addEntry,
        entries,
        deleteEntry,
        setForumLoading,
    } = useForum()

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
        closeForumModal()
    }

    const handleSubmit = data => {
        addEntry(data)
        closeForumModal()
    }

    const renderThreads = threads => (
        <View
            style={{
                flexGrow: 0,
                // gap: 7,
            }}
        >
            {threads.map((items, index) => (
                <ForumList
                    key={`thread-${index}`}
                    entries={items}
                    onDelete={removeEntry}
                />
            ))}
        </View>
    )
    
    return (
        <View style={{ flex: 1 }}>

            <ForumHeader setModal={setForumModal} />

            <View style={{ flexGrow: 1 }}>
                {entries.length
                    ? renderThreads(sortedThreads)
                    : <ThemedText>No entries yet.</ThemedText>
                }
            </View>

            <ForumModal
                modal={forumModal}
                onCancel={closeForumModal}
                onSubmit={handleSubmit}
            />
                
        </View>
    )
}