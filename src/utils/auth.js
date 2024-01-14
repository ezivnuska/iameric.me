import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from '../Data'
import { cleanStorage, clearStorage, getUserToken, setUserToken } from './storage'

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
            dispatch({ type: 'SET_LOADED', loaded: true })
            dispatch({ type: 'SET_LOADING', loading: null })
            
            return user
        } else {
            await clearStorage()
        }

        return null
    }

    return null
}