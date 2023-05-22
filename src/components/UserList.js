import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    View,
} from 'react-native'

import { UserListItem } from '../components'
import { AppContext } from '../AppContext'

const UserList = ({ clearUser, setUser, users }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    const [items, setItems] = useState([])

    useEffect(() => {
        if (users) setItems([...users.filter(user => user.username !== 'Guest')])
    }, [users])

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={items}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => (
                    <UserListItem
                        user={item}
                        setUser={setUser}
                        clearUSer={clearUser}
                    />
                )} 
            />
        </View>
    )
}

export default UserList

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 10,
        // paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    list: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
    },
})