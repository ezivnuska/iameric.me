import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    Menu,
    UserHeading,
} from '.'

const UserProfile = ({ user }) => (
    <View style={styles.container}>
        <View style={styles.heading}>
            <UserHeading user={user} />
        </View>
        {user.role === 'vendor' && <Menu vendorId={user._id} />}
    </View>
)

export default UserProfile

const styles = StyleSheet.create({
    container: {

    },
    heading: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
})