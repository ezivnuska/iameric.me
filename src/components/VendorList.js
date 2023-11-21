import React from 'react'
import {
    FlatList,
    Pressable,
} from 'react-native'
import {
    UserHeading,
} from '.'
import { navigate } from '../navigators/RootNavigation'

const VendorListItem = ({ user }) => (
    <Pressable
        user={user}
        onPress={() => navigate('Details', { id: user._id })}
    >
        <UserHeading user={user} />
    </Pressable>
)

export default ({ users }) => (
    <FlatList
        data={users}
        listKey={() => 'vendor-list'}
        keyExtractor={item => `vendor-list-item-${item._id}`}
        renderItem={({ item }) => <VendorListItem user={item} />} 
    />
)