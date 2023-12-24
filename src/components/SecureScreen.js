import React, { useContext, useEffect } from 'react'
import {
    Screen,
} from '@components'
import { AppContext } from '../AppContext'
import { navigate } from '@navigators/RootNavigation'
import { authenticate } from 'src/Data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingView from './LoadingView'

export default ({ children }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        if (!user) {
            checkUser()
        }
    }, [user])

    const checkUser = async () => {
        const token = await AsyncStorage.getItem('userToken')
        if (!token) navigate('Start')
        else {
            const verifiedUser = await authenticate(token)
            if (!verifiedUser) navigate('Start')
            else {
                dispatch({ type: 'SET_VERIFIED', verified: true })
                dispatch({ type: 'SET_USER', user: verifiedUser })
                dispatch({ type: 'SET_LOADING', loading: false })
                navigate('Secure')
            }
        }
    } 

    return user ? (
        <Screen>
            {children}
        </Screen>
    ) : <LoadingView label='Loading user...' />
}