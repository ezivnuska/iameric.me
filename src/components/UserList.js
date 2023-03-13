import React, { useContext } from 'react'
import {
    FlatList,
    StyleSheet,
} from 'react-native'

import { UserListItem } from '../components'
import { AppContext } from '../AppContext'

const UserList = ({ setUser, users }) => {

    const {
        dispatch,
    } = useContext(AppContext)

    return (
        <FlatList
            data={users}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
                <UserListItem
                    user={item}
                    setUser={setUser}
                />
            )} 
        />
    )
}

export default UserList

const styles = StyleSheet.create({

})