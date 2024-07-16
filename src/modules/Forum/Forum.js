import React, { useEffect } from 'react'
import { View } from 'react-native'
import {
    IconButton,
    ThemedText,
} from '@components'
import {
    ForumHeader,
    ForumList,
} from './components'
import { useApp } from '@app'
import { useForum } from '@forum'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { deleteEntryWithId } from '@utils/forum'

export default () => {

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
            style={{ gap: 10 }}
        >

            <ForumHeader title='Forum'>

                <IconButton
                    name='add-outline'
                    onPress={() => setModal('FEEDBACK')}
                    size={24}
                />

            </ForumHeader>

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