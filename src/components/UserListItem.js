import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native'
import { UserHeading } from '.'

const UserListItem = ({ user, onPress }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(user)}
    >
        <UserHeading user={user} />
    </TouchableOpacity>
)

export default UserListItem

const styles = StyleSheet.create({
    container: {
        
    },
})