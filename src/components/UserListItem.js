import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { UserDetails } from '.'


const UserListItem = ({ user, ...props }) => (
    <View style={styles.container} {...props}>
        <UserDetails user={user} />
    </View>
)

export default UserListItem

const styles = StyleSheet.create({
    container: {
        
    },
})