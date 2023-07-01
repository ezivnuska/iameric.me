import React, { useContext, useEffect, useState } from 'react'
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'

import { UserDetails } from '.'

const UserList = ({ onItemPressed, users }) => {

    const [items, setItems] = useState([])

    useEffect(() => {
        if (users) setItems(users)
    }, [users])

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={items}
                listKey={() => 'users'}
                keyExtractor={(item, index) => 'user' + index}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => onItemPressed(item._id)}
                    >
                        <UserDetails user={item} />
                    </TouchableOpacity>
                )} 
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
        paddingHorizontal: 3,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 6,
    },
    list: {
        // flex: 1,
        // alignSelf: 'center',
        // width: 300,
        // minWidth: 300,
        // maxWidth: 300,
        paddingVertical: 3,
    },
})