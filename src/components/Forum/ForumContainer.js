import React from 'react'
import {
    ForumList,
} from './components'
import {
    useForum,
    useModal,
} from '@context'
import { deleteEntryWithId } from '@utils/forum'

export default () => {

    const {
        entries,
        deleteEntry,
        setForumLoading,
    } = useForum()

    const {
        closeModal,
    } = useModal()

    const removeEntry = async id => {
        setForumLoading(true)
        await deleteEntryWithId(id)
        setForumLoading(false)

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