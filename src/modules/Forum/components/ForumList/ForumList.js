import React from 'react'
import { FlatList } from 'react-native'
import { ForumListItem } from './components'
import { useApp } from '@app'
import { useModal } from '@modal'
// import { getProfileImagePathFromUser } from '@utils/images'

export default ({ entries, onDelete }) => {

    const { user } = useApp()
    const { setModal } = useModal()

    return (
        <FlatList
            data={entries}
            listKey={() => 'entries'}
            keyExtractor={(item, index) => `${index}-entry-${item._id}`}
            renderItem={({ item }) => (
                <ForumListItem
                    item={item}
                    // imagePath={getProfileImagePathFromUser(item)}
                    onDelete={onDelete}
                    // onPress={() => setModal('CONTACT', item.author)}
                    owner={user && (user._id === item.author._id) || user.role === 'admin'}
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 20,
            }}
            style={{
                width: '100%',
            }}
        />
    )
}