import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Pressable,
    View,
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

export default ({ users }) => {

    const [items, setItems] = useState([])

    useEffect(() => {
        if (users) setItems(users)
    }, [users])

    return (
        <View
            style={{
                paddingHorizontal: 5,
            }}
        >
            <FlatList
                data={items}
                listKey={() => 'users'}
                keyExtractor={(item, index) => 'user' + index}
                renderItem={({ item }) => (
                    <UserListItem
                        user={item}
                    />
                )} 
            />
        </View>
    )
}