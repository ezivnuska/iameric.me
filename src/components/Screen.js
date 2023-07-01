import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../navigators/RootNavigation'
import defaultStyles from '../styles'
import { Container, Header, StatusDisplay } from '.'
import { AppContext } from '../AppContext'
const window = Dimensions.get('window')
const { height } = window

const Screen = ({ children, route }) => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { status } = state
    
    const saveRoute = () => {
        AsyncStorage
            .setItem('route', route.name)
            .then(() => {
                // console.log('path saved in local storage:', route.name)
            })
            .catch(err => console.log('could not save path:', err))
    }

    useEffect(() => {
        if (route && route.name !== 'auth') {
            saveRoute()
        }
    }, [route])

    const hideStatus = () => dispatch({ type: 'SET_STATUS', status: null })
    
    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                {children}
            </View>
        </View>
    )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 'auto',
        height: height - 50,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    screenContainer: {
        flex: 1,
        width: '98%',
        minWidth: 300,
        maxWidth: 900,
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: 'blue',
        backgroundColor: '#fff',
    },
})