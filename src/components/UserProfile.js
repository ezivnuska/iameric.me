import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    MenuDisplay,
    UserHeading,
} from '.'

const UserProfile = ({ user }) => {
    console.log('user', user)
    return (
        <View style={styles.container}>
            <UserHeading user={user} />
            {user.role === 'vendor' && <MenuDisplay vendorId={user._id} />}
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {

    },
})