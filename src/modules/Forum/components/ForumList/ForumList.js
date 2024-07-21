import React from 'react'
import { FlatList } from 'react-native'
import { ForumListItem } from './components'

export default ({ entries, onDelete }) => (
    <FlatList
        data={entries}
        listKey={() => 'entries'}
        keyExtractor={(item, index) => `${index}-entry-${item._id}`}
        renderItem={({ item }) => (
            <ForumListItem
                item={item}
                onDelete={onDelete}
            />
        )}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
            flex: 1,
            paddingBottom: 20,
        }}
    />
)