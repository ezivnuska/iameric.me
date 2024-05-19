import React from 'react'
import {
    ForumList,
} from './components'
import {
    useForum,
    useModal,
} from '@context'
import { deleteEntryWithId } from '@utils/forum'

export default props => {

    const {
        entries,
        deleteEntry,
        setForumLoading,
    } = useForum()

    const {
        closeModal,
        setModal,
    } = useModal()

    const removeEntry = async id => {
        setForumLoading(true)
        await deleteEntryWithId(id)
        setForumLoading(false)

        // handle forum state
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