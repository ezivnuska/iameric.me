import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    UserHeading,
} from '.'

const UserProfile = ({ user }) => {
    return (
        <View style={styles.container}>
            <UserHeading user={user} />
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {

    },
})