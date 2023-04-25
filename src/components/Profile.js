import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { Avatar } from './'
import defaultStyles from '../styles'

const Profile = ({ user }) => (
    <View style={styles.container}>
        <View style={styles.leftColumn}>
            <Avatar user={user} size={48} />
        </View>
        <View style={styles.main}>
            <Text style={styles.heading}>{user.username}</Text>
            <Text style={[defaultStyles.text, defaultStyles.email]}>{user.email}</Text>
        </View>
    </View>
)

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 350,
        minWidth: 350,
        maxWidth: 350,
        marginHorizontal: 'auto',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        flex: 1,
        flexBasis: 'auto',
        flexGrow: 0,
        paddingRight: 10,
    },
    main: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    heading: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 24,
    },
    content: {
        flex: 2,
        lineHeight: 24,
    },
})