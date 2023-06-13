import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'

import { UserListItem } from '.'
import { AppContext } from '../AppContext'

const UserList = ({ users }) => {

    const [items, setItems] = useState([])

    useEffect(() => {
        if (users) setItems(users)
    }, [users])

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={items}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => <UserListItem user={item} />} 
            />
        </View>
    )
}

export default UserList

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        paddingHorizontal: 5,
        // paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    list: {
        // flex: 1,
        // alignSelf: 'center',
        // width: 300,
        // minWidth: 300,
        // maxWidth: 300,
        paddingVertical: 5,
    },
})