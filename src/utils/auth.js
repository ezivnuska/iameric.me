import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from '../Data'
import { setUserToken } from './storage'

export const initialize = async dispatch => {
    
    console.log('initializing')

    dispatch({ type: 'SET_LOADING', loading: 'Looking for user...' })
    
    const tokenFromStorage = await AsyncStorage.getItem('userToken')
    
    if (tokenFromStorage) {
        
        // if stored token found...
        dispatch({ type: 'SET_LOADING', loading: 'User found. Verifying...' })

        const verifiedUser = await authenticate(tokenFromStorage)
        
        // if user token could not be verified...
        if (verifiedUser) {
            // if token verified...
            await setUserToken(verifiedUser.token)
            
        }
        dispatch({ type: 'SET_LOADING', loading: null })
        
        return verifiedUser

    }

    return null
}