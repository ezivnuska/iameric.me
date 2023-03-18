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
    } = useContext(AppContext)

    const { user } = state
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        iam
                        <Text style={{color: '#ddd'}}>
                            eric
                        </Text>
                    </Text>
                </View>
                {user ? (
                    <View style={styles.aside}>
                        <TouchableOpacity
                            style={styles.username}
                            onPress={() => navigate('Settings')}
                        >
                            <Text style={[styles.text, styles.username]}>{user.username}</Text>
                        </TouchableOpacity>
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
        flexWrap: 'nowrap',
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
        minWidth: 375,
        maxWidth: 900,
        width: '80%',
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
    username: {
        flex: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        color: '#ffffff',
        fontWeight: 700,
    },
    text: {
        paddingHorizontal: 10,
        // lineHeight: 45,
    },
})