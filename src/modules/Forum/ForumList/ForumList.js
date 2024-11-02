import React from 'react'
import { FlatList } from 'react-native'
import { ForumListItem } from './components'

const ForumList = ({ entries, onDelete, ...props }) => (
    <FlatList
        {...props}
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
        // style={{ flex: 1 }}
        contentContainerStyle={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 5,
            // borderWidth: 1,
            // paddingBottom: 20,
        }}
    />
)

export default ForumList