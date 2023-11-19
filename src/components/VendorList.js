import React, { useContext } from 'react'
import {
    FlatList,
} from 'react-native'
import {
    UserListItem,
} from '.'
import { navigate } from '../navigators/RootNavigation'
import { AppContext } from '../AppContext'

export default ({ users }) => {
    console.log('users', users)
    return (users && users.length)
        ? (
            <FlatList
                data={users}
                listKey={() => 'user-list'}
                keyExtractor={item => 'user' + item._id}
                renderItem={({ item }) => (
                    <UserListItem
                        user={item}
                        onPress={id => navigate('Details', { id })}
                    />
                )} 
            />
        ) : null
}