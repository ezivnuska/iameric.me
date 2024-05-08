import React from 'react'
import {
    ForumList,
    IconButton,
    ScreenContent,
    TitleBar,
} from '@components'
import {
    Screen,
} from '.'
import {
    useForum,
    useModal,
} from '@context'
import { deleteEntryWithId } from '@utils/forum'

export default props => {

    const {
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
        <Screen {...props}>
            <TitleBar title='Forum'>
                <IconButton
                    label='Comment'
                    iconName='add-outline'
                    onPress={() => setModal('FEEDBACK')}
                    padded={true}
                    transparent
                />
            </TitleBar>
            <ScreenContent>
                <ForumList
                    onDelete={removeEntry}
                />
            </ScreenContent>
        </Screen>
    )
}