import React from 'react'
import {
    View,
} from 'react-native'
import {
    EmptyStatus,
    ForumList,
    IconButton,
    ScreenContent,
    TitleBar,
} from '@components'
import {
    useForum,
    useModal,
} from '@context'
import { deleteEntryWithId } from '@utils/forum'

export default () => {

    const {
        deleteEntry,
        entries,
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

    if (!entries || !entries.length) return <EmptyStatus status='No entries yet.' />

    return (
        <View>
            <TitleBar title='Forum'>
                <IconButton
                    label='Comment'
                    iconName='add-outline'
                    onPress={() => setModal('FEEDBACK')}
                    // alignIcon='right'
                    padded={true}
                    // outline
                    // style={{ paddingHorizontal: 10, paddingLeft: 10, paddingRight: 10 }}
                    transparent
                />
            </TitleBar>
            <ScreenContent>
                <ForumList
                    items={entries}
                    onDelete={removeEntry}
                />
            </ScreenContent>
        </View>
    )
}