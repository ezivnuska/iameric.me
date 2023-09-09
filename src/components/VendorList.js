import React, { useState } from 'react'
import {
    FlatList,
    StyleSheet,
} from 'react-native'
import {
    UserListItem,
} from '.'
import { navigate } from '../navigators/RootNavigation'

const VendorList = ({ users }) => {

    const [items, setItems] = useState(users)

    const onPress = user => navigate('Details', { id: user._id })

    return (
        <FlatList
            data={items}
            listKey={() => 'users'}
            keyExtractor={(item, index) => 'user' + index}
            style={styles.list}
            renderItem={({ item }) => (
                <UserListItem
                    user={item}
                    onPress={onPress}
                />
            )} 
        />
    )
}

export default VendorList

const styles = StyleSheet.create({
    list: {
        borderWidth: 1,
        borderColor: '#ccc',
    },
})