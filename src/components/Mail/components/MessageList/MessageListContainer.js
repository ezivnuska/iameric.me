import React from 'react'
import { FlatList } from 'react-native'
import { MessageListItem } from './components'
import { useApp } from '@app'
import { useModal } from '@modal'
// import { getProfileImagePathFromUser } from '@utils/images'

export default ({ messages, onDelete }) => {

    const { user } = useApp()
    const { setModal } = useModal()

    return (
        <FlatList
            data={messages}
            listKey={(m, i) => {{`message-${i}`}}}
            keyExtractor={(item, index) => `${index}-message-${item._id}`}
            renderItem={({ item }) => (
                <MessageListItem
                    item={item}
                    // imagePath={getProfileImagePathFromUser(item)}
                    onDelete={onDelete}
                    // onPress={() => setModal('CONTACT', item.author)}
                    // owner={user && user._id === item.author._id}
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