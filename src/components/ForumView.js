import React from 'react'
import {
    View,
} from 'react-native'
import {
    EmptyStatus,
    ForumList,
    IconButton,
    TitleBar,
} from '@components'
import {
    useForum,
} from '@context'
import { deleteEntryWithId } from '@utils/forum'

export default () => {

    const {
        closeForumModal,
        deleteEntry,
        entries,
        setForumLoading,
        setForumModal,
    } = useForum()

    const removeEntry = async id => {
        setForumLoading(true)
        await deleteEntryWithId(id)
        setForumLoading(false)

        // handle forum state
        deleteEntry(id)
        closeForumModal()
    }

    if (!entries || !entries.length) return <EmptyStatus status='No entries yet.' />

    return (
        <View>
            <TitleBar title='Forum'>
                <IconButton
                    label='Comment'
                    iconName='add-outline'
                    onPress={() => setForumModal('FEEDBACK')}
                    alignIcon='right'
                    justify='left'
                    outline
                    style={{ paddingHorizontal: 10, paddingLeft: 10, paddingRight: 10 }}
                    transparent
                />
            </TitleBar>
            <ForumList
                items={entries}
                onDelete={removeEntry}
            />
        </View>
    )
}