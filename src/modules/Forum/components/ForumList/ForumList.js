import React from 'react'
import { FlatList } from 'react-native'
import { ForumListItem } from './components'
import { useApp } from '@app'

export default ({ entries, onDelete }) => {

    const { user } = useApp()

    return (
        <FlatList
            data={entries}
            listKey={() => 'entries'}
            keyExtractor={(item, index) => `${index}-entry-${item._id}`}
            renderItem={({ item }) => (
                <ForumListItem
                    item={item}
                    onDelete={onDelete}
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