import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from '../Data'
import { cleanStorage, clearStorage, getUserToken, setUserToken } from './storage'
import axios from 'axios'

export const initialize = async dispatch => {
    
    console.log('initializing')

    dispatch({ type: 'SET_LOADING', loading: 'Looking for user...' })
    
    const tokenFromStorage = await AsyncStorage.getItem('userToken')
    
    if (tokenFromStorage) {
        
        // if stored token found...
        dispatch({ type: 'SET_LOADING', loading: 'User found. Verifying...' })

        const user = await authenticate(dispatch, tokenFromStorage)
        
        // if user token could not be verified...
        if (user) {
            // if token verified...
            await setUserToken(user.token)
            
            dispatch({ type: 'SET_USER', user })
            
            return user
        } else {
            await clearStorage()
        }
    }
    
    dispatch({ type: 'SET_LOADED', loaded: true })
    dispatch({ type: 'SET_LOADING', loading: null })
    
    return null
}



export const signout = async (dispatch, _id) => {

    dispatch({ type: 'SET_LOADING', loading: 'Signing out...' })
    
    const { data } = await axios
        .post('/api/signout', { _id })
    
    if (!data) {
        console.log('could not sign out user')
    } else {
        
        await cleanStorage()
        
        console.log('signed out user')
        
        dispatch({ type: 'SET_LOADING', loading: null })
        dispatch({ type: 'SET_LOADED', loaded: null })
        dispatch({ type: 'SIGNOUT' })

        // navigationRef.navigate('Start')
    }
}

export const validateToken = async token => {
    const userFromToken = await axios
        .post('/api/token', { token })
        console.log('userFromToken', userFromToken)
    const expired = (new Date(userFromToken.exp) - Date.now() > 0)
    console.log('expired', expired)
}