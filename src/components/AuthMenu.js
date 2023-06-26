import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Disconnect,
} from './'

const AuthMenu = ({ navigate, user }) => (
    <View style={styles.aside}>
        {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('chat')}
        >
            <Text style={styles.username}>chat</Text>
        </TouchableOpacity> */}
        {(user.role !== 'guest') ? (
            <TouchableOpacity
                style={styles.usernameButton}
                onPress={() => navigate('settings')}
            >
                <Text style={styles.username}>{user.username}</Text>
            </TouchableOpacity>
        ) : null}
        <Disconnect />
    </View>
)

export default AuthMenu

const styles = StyleSheet.create({
    aside: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        flex: 1,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        paddingRight: 10,
    },
    usernameButton: {
        flex: 1,
        flexShrink: 0,
        flexBasis: 'auto',
    },
    username: {
        paddingHorizontal: 10,
        color: '#fff',
        fontWeight: 700,
    },
})