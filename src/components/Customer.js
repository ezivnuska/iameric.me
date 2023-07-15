import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    UserList,
} from '.'

const Customer = ({ itemPressed, users }) => {
    return (
        <View style={styles.container}>
            <UserList
                users={users}
                onItemPressed={itemPressed}
            />
        </View>
    )
}

export default Customer

const styles = StyleSheet.create({
    container: {

    },
})