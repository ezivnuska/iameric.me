import React, { useContext, useEffect, useState } from 'react'
import {
    LoadingView,
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import {
    authenticate,
    // initialize,
} from '../utils/auth'
// import { setUserToken } from '../utils/storage'
// import AsyncStorage from '@react-native-async-storage/async-storage'

export default ({ children, navigation, ...props }) => {

    const {
        dispatch,
        loading,
        user,
        loaded,
    } = useContext(AppContext)

    useEffect(() => {
        // console.log('SecureScreen--> onStart')
        // if (!user) navigation.navigate('Public', { screen: 'Start' })
        // else navigation.navigate('Private')
    }, [])

    // useEffect(() => {
    //     console.log('SecureScreen:onUserChanged-->', user)
        
    // }, [user])

    // useEffect(() => {
    //     // console.log('SecureScreenChanged: user:', user)
    //     // console.log('SecureScreenChanged: loading:', loading)
    //     // console.log('SecureScreenChanged: verified:', verified)
    //     if (!loading) {
    //         if (!verified) {
    //             if (user) {
    //                 dispatch({ type: 'SIGNOUT' })
    //                 // navigation.navigate('Public', { screen: 'Start' })
    //             }
    //         } else {
    //             if (user) {
    //                 // navigation.navigate('Private')
    //             } else dispatch({ type: 'SET_VERIFIED', verified: false })
    //         }
    //     }
    // }, [loading, user, verified])

    // const checkUser = async () => {
    //     dispatch({ type: 'SET_LOADING', loading: 'Verifying user...' })
    //     const token = await AsyncStorage.getItem('userToken')
    //     if (token) {
    //         const verifiedUser = await authenticate(token)
    //         if (verifiedUser) {
    //             dispatch({ type: 'SET_VERIFIED', verified: true })
    //             dispatch({ type: 'SET_USER', user: verifiedUser })
    //             // navigate('Private')
    //             setSecureUser(verifiedUser)
    //         } else {
    //             navigation.navigate('Start')
    //         }
    //     }
    //     dispatch({ type: 'SET_LOADING', loading: null })
    // } 

    return (
        <Screen style={props.style || {}}>
            {user ? children : null}
        </Screen>
    )
    // return (
    //     <Screen style={props.style || {}}>
    //         {children}
    //     </Screen>
    // )
}