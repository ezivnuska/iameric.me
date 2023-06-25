import React, { useContext, useEffect } from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
    // Disconnect,
} from '../components'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

// const windowWidth = Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height

const Header = () => {
    
    const {
        // state,
        user,
    } = useContext(AppContext)
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Brand onPress={() => navigate(user ? 'home' : 'auth')} />
                {user && <AuthMenu navigate={navigate} user={user} />}
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
})