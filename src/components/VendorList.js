import React, { useContext } from 'react'
import {
    FlatList,
} from 'react-native'
import {
    UserListItem,
} from '.'
import { navigate } from '../navigators/RootNavigation'
import { AppContext } from '../AppContext'

export default () => {

    const {
        vendors,
    } = useContext(AppContext)

    return (vendors && vendors.length)
        ? (
            <FlatList
                data={vendors}
                listKey={() => 'vendors'}
                keyExtractor={item => 'vendor' + item._id}
                renderItem={({ item }) => (
                    <UserListItem
                        user={item}
                        onPress={id => navigate('Details', { id })}
                    />
                )} 
            />
        ) : null
}