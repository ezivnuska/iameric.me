import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {
    LoadingView,
    PopUpModal,
    Screen,
    SignUpForm,
    SignInForm,
} from '@components'
import { AppContext } from '../AppContext'
import { Button } from 'antd'
import { connect } from '../Data'
import { checkRoute } from '../navigators/RootNavigation'
import { navigate } from '../navigators/RootNavigation'
import { authenticate } from '../Data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CenteredView } from 'src/components'

export default ({ navigation }) => {
    
    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        console.log('initializing...')
        initialize()
    }, [])

    const initialize = async () => {
        const tokenFromStorage = await AsyncStorage.getItem('userToken')
        console.log('tokenFromStorage', tokenFromStorage)
        if (!tokenFromStorage) {
            // if no token found in storage
            dispatch({ type: 'SET_LOADING', loading: false })
            // TODO: maybe check for and clean any existing stored data
            navigation.navigate('Start')
        } else {
            // if stored token found...
            dispatch({ type: 'SET_LOADING', loading: 'Verifying user...' })
            const verifiedUser = await authenticate(tokenFromStorage)
            
            // if user token could not be verified...
            if (!verifiedUser) {
                dispatch({ type: 'SET_LOADING', loading: false })
                navigation.navigate('Start')
            } else {
                // if token verified...
                AsyncStorage.setItem('userToken', verifiedUser.token)

                dispatch({ type: 'SET_USER', user: verifiedUser })

                dispatch({ type: 'SET_VERIFIED', verified: true })

                dispatch({ type: 'SET_LOADING', loading: false })

                navigation.navigate('Secure')
            }
        }
    }

    // const init = async () => {
    //     const oldUser = await checkUser()
    //     if (oldUser) {
    //         console.log('NAVIGATION:checkRoute')
    //         checkRoute()
    //     }
    // }

    // const checkUser = async () => {
        
    //     dispatch({ type: 'SET_LOADING', loading: 'Navigation: verifying user...' })
    //     const userToken = await AsyncStorage.getItem('userToken')
        
    //     if (!userToken) {
    //         await cleanStorage()
    //         dispatch({ type: 'SET_LOADING', loading: null })
    //         return null
    //     }

    //     const verifiedUser = await authenticate(userToken)
        
    //     dispatch({ type: 'SET_LOADING', loading: null })

    //     if (!verifiedUser) {
    //         await cleanStorage()
    //         return null
    //     }
        
    //     AsyncStorage.setItem('userToken', verifiedUser.token)
    //     dispatch({ type: 'SET_USER', user: verifiedUser })

    //     return verifiedUser
    // }

    // const setUser = ({
    //     _id,
    //     email,
    //     images,
    //     profileImage,
    //     role,
    //     username,
    // }) => {
    //     dispatch({
    //         type: 'SET_USER',
    //         user: {
    //             _id,
    //             email,
    //             images,
    //             profileImage,
    //             role,
    //             username,
    //         }
    //     })
    // }

    return (
        <Screen>
            <CenteredView>
                <LoadingView label={loading} />
            </CenteredView>
        </Screen>
    )
}