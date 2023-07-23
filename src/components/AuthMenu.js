import React, { useContext } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Disconnect,
} from './'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { AppContext } from '../AppContext'

const AuthMenu = ({ navigate, user }) => {
    
    const { state } = useContext(AppContext)
    const { items } = state.cart

    return (
        <View style={styles.aside}>
            {items.length
                ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log('cart button pressed')}
                    >
                        <ShoppingCartOutlined />
                    </TouchableOpacity>
                ) : null
            }

            {(user.role !== 'guest')
                ? (
                    <TouchableOpacity
                        style={styles.usernameButton}
                        onPress={() => navigate('settings')}
                    >
                        <Text style={styles.username}>{user.username}</Text>
                    </TouchableOpacity>
                ) : null
            }
            
            <Disconnect />
        </View>
    )
}

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