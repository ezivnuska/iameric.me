import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    AuthMenu,
    Brand,
    CenteredContent,
} from '.'
import { AppContext } from '../AppContext'
import { navigate } from '../navigators/RootNavigation'
import base from '../styles/base'

const Header = () => {
    
    const {
        // state,
        user,
    } = useContext(AppContext)
    
    return (
        <CenteredContent type='full' style={{ backgroundColor: base.headerBGColor }}>
            
            <View style={styles.container}>
                
                <View style={styles.brand}>
                    <Brand onPress={() => navigate(user ? 'Home' : 'Start')} />
                </View>

                <View style={styles.auth}>
                    <AuthMenu />
                </View>
            </View>

        </CenteredContent>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%',
        minWidth: 300,
        maxWidth: 900,
        marginHorizontal: 'auto',
        height: 50,
        minHeight: 50,
        maxHeight: 50,
    },
    brand: {
        // flex: 1,
        // flexGrow: 1,
        // flexShrink: 0,
        flexBasis: 'auto',
    },
    auth: {
        // flex: 1,
        // flexGrow: 0,
        // flexShrink: 0,
        flexBasis: 'auto',
    },
})