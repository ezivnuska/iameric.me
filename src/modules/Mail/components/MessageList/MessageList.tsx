import React from 'react'
import { FlatList } from 'react-native'
import { MessageListItem } from './components'

export default ({ messages, onDelete }) => {

    return (
        <FlatList
            data={messages}
            listKey={(msg, index) => {{`${index}-message-${msg._id}`}}}
            keyExtractor={item => `message-${item._id}`}
            renderItem={({ item }) => (
                <MessageListItem
                    item={item}
                    onDelete={() => onDelete(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
            style={{ flexGrow: 1 }}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20,
            }}
        />
    )
}