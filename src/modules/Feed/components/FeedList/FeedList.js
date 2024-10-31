import React from 'react'
import { FlatList } from 'react-native'
import { FeedListItem } from './components'

export default ({ posts, onDelete }) => (
    <FlatList
        data={posts}
        listKey={() => 'posts'}
        keyExtractor={(item, index) => `${index}-post-${item._id}`}
        renderItem={({ item }) => (
            <FeedListItem
                item={item}
                onDelete={onDelete}
            />
        )}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 5,
            // paddingBottom: 20,
        }}
    />
)