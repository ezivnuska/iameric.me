import React from 'react'
import { FlatList } from 'react-native'
import { BipListItem } from './components'

export default ({ bips }) => (
    <FlatList
        data={bips}
        listKey={() => 'bips'}
        keyExtractor={(item, index) => `${index}-bip-${item._id}`}
        renderItem={({ item }) => <BipListItem item={item} />}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
    />
)