import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
} from '.'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'

const Header = () => {
    
    const {
        // state,
        user,
    } = useContext(AppContext)
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.child}>
                    <Brand onPress={() => navigate(user ? 'Home' : 'Start')} />
                </View>
                {user && (
                    <View style={styles.child}>
                        <AuthMenu navigate={navigate} user={user} />
                    </View>
                )}
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
        // flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        width: '100%',
        minWidth: 300,
        maxWidth: 900,
        marginHorizontal: 'auto',
        // height: 50,
        minHeight: 50,
        maxHeight: 50,
    },
    child: {
        flexBasis: 'auto',
    },
})