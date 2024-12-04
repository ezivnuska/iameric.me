import React from 'react'
import { View } from 'react-native'
import { FeedListItem } from './components'

const FeedList = ({ posts, onDelete, ...props }) => (
    <View
        {...props}
        style={{
            flexBasis: 'auto',
            gap: 10,
        }}
    >
        {posts.map((post, index) => (
            <FeedListItem
                key={`thread-item-${index}`}
                item={post}
                onDelete={onDelete}
            />
        ))}
    </View>
)

export default FeedList