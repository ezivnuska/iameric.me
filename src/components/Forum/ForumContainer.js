import React, { useEffect } from 'react'
import {
    ForumList,
} from './components'
import {
    useApp,
    useForum,
    useModal,
} from '@context'
import { deleteEntryWithId } from '@utils/forum'

export default () => {

    const { socket } = useApp()

    const {
        addEntry,
        entries,
        deleteEntry,
        setForumLoading,
    } = useForum()

    const {
        closeModal,
    } = useModal()

    useEffect(() => {
        
        socket.on('add_entry', entry => addEntry(entry))

        socket.on('deleted_entry', id => deleteEntry(id))
    }, [])

    const removeEntry = async id => {
        setForumLoading(true)
        await deleteEntryWithId(id)
        setForumLoading(false)
        socket.emit('delete_entry', id)
        deleteEntry(id)
        closeModal()
    }
    
    return (
        <ForumList
            entries={entries}
            onDelete={removeEntry}
        />
    )
}