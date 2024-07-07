import React, { useEffect } from 'react'
import { View } from 'react-native'
import { SimpleButton } from '@components'
import { ForumList } from './components'
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

            <ForumList
                entries={entries}
                onDelete={removeEntry}
            />

        </View>
    )
}