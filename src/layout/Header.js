import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
} from '../components'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const Header = () => {
    
    const {
        // state,
        user,
    } = useContext(AppContext)
    
    return (
        <View
            style={styles.container}>
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
        backgroundColor: '#369',
        width: '100%',
    },
    headerContainer: {
        flex: 1,
        flexShrink: 0,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        width: '98%',
        minWidth: 300,
        maxWidth: 900,
        marginHorizontal: 'auto',
        // height: 50,
        minHeight: 50,
        maxHeight: 50,
    },
})