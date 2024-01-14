import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from '../Data'
import { setUserToken } from './storage'

export const checkAuth = async dispatch => {
    
    console.log('checking for signed-in user...')

    dispatch({ type: 'SET_LOADING', loading: 'Looking for user...' })
    
    const tokenFromStorage = await AsyncStorage.getItem('userToken')
    
    if (tokenFromStorage) {
        
        console.log('verifying previously signed-in user...')
        
        // if stored token found...
        dispatch({ type: 'SET_LOADING', loading: 'User found. Verifying...' })

        const verifiedUser = await authenticate(tokenFromStorage)

        // if user token could not be verified...
        if (verifiedUser) {
            // if token verified...
            await setUserToken(verifiedUser.token)

            console.log(`${verifiedUser.username} verified.`)

            dispatch({ type: 'SET_USER', user: verifiedUser })
            
            // return verifiedUser
        }
    }

    // return null

    dispatch({ type: 'SET_LOADING', loading: null })
    dispatch({ type: 'SET_LOADED', loaded: true })
}