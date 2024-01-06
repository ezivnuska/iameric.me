import React, { useContext, useEffect, useState } from 'react'
import {
    LoadingView,
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import { authenticate } from '../Data'
import { setUserToken } from '../utils/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initialize } from '../utils/auth'

export default ({ children, navigation, ...props }) => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    // useEffect(() => {
    //     if (!user) {
    //         // console.log('not verified')
    //         // initialize(dispatch)
    //         navigation.navigate('Start')
    //     }
    // }, [user])

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
            {loading
                ? <LoadingView />
                : children
            }
        </Screen>
    )
}