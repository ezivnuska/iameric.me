import React, { useEffect, useState } from 'react'
import {
    FlatList,
    View,
} from 'react-native'

import {
    UserListItem,
} from '.'
import { navigate } from '../navigators/RootNavigation'

export default ({ users }) => {

    const [items, setItems] = useState([])
    const [feature, setFeature] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

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
                style={{
                    paddingVertical: 3,
                }}
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