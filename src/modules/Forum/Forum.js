import React, { useEffect, useMemo } from 'react'
import { View } from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { ForumList } from './components'
import { useApp } from '@app'
import { useForum } from '@forum'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { deleteEntryWithId } from '@utils/forum'

export default () => {

    const { user } = useApp()
    const { socket } = useSocket()

    const {
        addEntry,
        entries,
        deleteEntry,
        setForumLoading,
    } = useForum()

    const {
        closeModal,
        setModal,
    } = useModal()

    const mail = useMemo(() => entries.filter(e => e.author._id === user._id && e.private))

    useEffect(() => {
        socket.on('new_entry', addEntry)
        socket.on('deleted_entry', deleteEntry)
    }, [])

    // useEffect(() => {
    //     socket.on('add_entry', entry => addEntry(entry))
    //     socket.on('deleted_entry', id => deleteEntry(id))
    // }, [])

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
            style={{ gap: 10 }}
        >

            <SimpleButton
                label='Add Comment'
                onPress={() => setModal('FEEDBACK')}
            />

            {entries.length ? (
                <ForumList
                    entries={entries}
                    onDelete={removeEntry}
                />
            ) : (
                <ThemedText>No entries yet.</ThemedText>
            )}

        </View>
    )
}