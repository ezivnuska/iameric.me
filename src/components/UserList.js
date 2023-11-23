import React from 'react'
import {
    FlatList,
    Pressable,
} from 'react-native'
import {
    UserHeading,
} from '.'
import { navigate } from '../navigators/RootNavigation'


const UserListItem = ({ user }) => (
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
        listKey={() => 'users'}
        keyExtractor={(item, index) => 'user' + index}
        renderItem={({ item }) => (
            <UserListItem
                user={item}
            />
        )} 
    />
)