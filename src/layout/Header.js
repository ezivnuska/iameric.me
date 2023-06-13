import React, { useContext, useEffect } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Disconnect } from '../components'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Header = () => {
    
    const {
        state,
        user,
    } = useContext(AppContext)
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.header}
                    onPress={() => navigate(user ? 'home' : 'auth')}
                >
                    <Text style={styles.title}>
                        iam
                        <Text style={{color: '#ddd'}}>
                            eric
                        </Text>
                    </Text>
                </TouchableOpacity>
                {user ? (
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
                ) : null}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        backgroundColor: '#999',
        width: '100%',
    },
    headerContainer: {
        flex: 1,
        flexShrink: 0,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        width: '80%',
        minWidth: 350,
        maxWidth: 900,
    },
    header: {
        flex: 1,
        margin: 0,
        paddingHorizontal: 10,
        flexBasis: 'auto',
    },
    title: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        lineHeight: 45,
        fontSize: 25,
        fontWeight: 700,
        color: '#fff',
    },
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