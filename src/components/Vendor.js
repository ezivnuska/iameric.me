import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    UserList,
} from '.'

const Vendor = ({ itemPressed, users }) => {
    return (
        <View style={styles.container}>
            <UserList
                users={users}
                onItemPressed={itemPressed}
            />
        </View>
    )
}

export default Vendor

const styles = StyleSheet.create({
    container: {

    },
})