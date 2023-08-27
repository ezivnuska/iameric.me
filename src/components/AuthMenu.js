import React, { useContext } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    CartButton,
    Disconnect,
} from '.'
import { AppContext } from '../AppContext'

const UserName = ({ username, onPress }) => (
    <TouchableOpacity
        style={styles.usernameButton}
        onPress={onPress}
    >
        <Text style={styles.username}>{username}</Text>
    </TouchableOpacity>
)

const AuthMenu = ({ navigate, user }) => {
    
    const { state } = useContext(AppContext)
    const { items } = state.cart

    return (
        <View style={styles.container}>

            {items && items.length ? <CartButton /> : null}

            <UserName username={user.username} onPress={() => navigate('Settings')} />
            
            <Disconnect />
        </View>
    )
}

export default AuthMenu

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        paddingRight: 10,
    },
    usernameButton: {
        flex: 1,
        flexShrink: 0,
        flexShrink: 1,
        flexBasis: 'auto',
        marginRight: 15,
        padding: 5,
    },
    username: {
        // paddingHorizontal: 10,
        color: '#fff',
        fontWeight: 700,
        // lineHeight: 24,

    },
})