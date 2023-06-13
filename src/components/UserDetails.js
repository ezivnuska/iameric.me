import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { UserHeading } from './'

const UserDetails = ({ user }) => {

    return (
        <View style={styles.container}>
            <UserHeading user={user} />
        </View>
    )
}

export default UserDetails

const styles = StyleSheet.create({
    container: {
        
    },
})