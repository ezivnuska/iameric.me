import React from 'react'
import {
    FlatList,
} from 'react-native'
import {
    ForumListItem,
} from './components'
import {
    useModal,
    useApp,
} from '@context'
import { getProfileImagePathFromUser } from '@utils/images'

export default ({ entries, onDelete }) => {

    const { setModal } = useModal()
    const { profile } = useApp()

    return (
        <FlatList
            data={entries}
            listKey={() => 'entries'}
            keyExtractor={(item, index) => `${index}-entry-${item._id}`}
            renderItem={({ item }) => (
                <ForumListItem
                    item={item}
                    imagePath={getProfileImagePathFromUser(item.author)}
                    onDelete={onDelete}
                    onPress={() => setModal('CONTACT', item.author)}
                    owner={profile && profile._id === item.author._id}
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 20,
            }}
        />
    )
}