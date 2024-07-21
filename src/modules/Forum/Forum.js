import React, { useEffect } from 'react'
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

    useEffect(() => {
        socket.on('new_entry', addEntry)
        socket.on('deleted_entry', deleteEntry)
    }, [])

    const removeEntry = async id => {
        setForumLoading(true)
        await deleteEntryWithId(id)
        setForumLoading(false)
        socket.emit('entry_deleted', id)
        deleteEntry(id)
        closeModal()
    }
    
    return (
        <View
            style={{
                flex: 1,
                gap: 10,
            }}
        >

            <View style={{ flexGrow: 0 }}>
                <ForumHeader />
            </View>

            <View style={{ flexGrow: 1 }}>

                {entries.length ? (
                    <ForumList
                        entries={entries}
                        onDelete={removeEntry}
                    />
                ) : (
                    <ThemedText>No entries yet.</ThemedText>
                )}
                
            </View>

        </View>
    )
}