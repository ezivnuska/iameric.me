import AsyncStorage from '@react-native-async-storage/async-storage'
import { cleanStorage, clearStorage, setUserToken } from './storage'
import axios from 'axios'

export const authenticate = async (dispatch, token) => {
    
    dispatch({ type: 'SET_LOADING', loading: 'Authenticating...' })
    
    const { data } = await axios.
        post('/api/authenticate', { token })
    
    if (!data) {
        console.log('Error authenticating token')
        await clearStorage()
        return null
    }

    const { user } = data

    await setUserToken(user.token)
            
    dispatch({ type: 'SET_USER', user })
    
    dispatch({ type: 'SET_LOADING', loading: null })
}

export const connect = async type => {

    const creds = {
        customer: { email: 'customer@iameric.me', password: 'customer' },
        driver: { email: 'driver@iameric.me', password: 'driver' },
        vendor: { email: 'vendor@iameric.me', password: 'vendor' },
    }
    
    const { email, password } = creds[type]
    
    const { data } = await axios.
        post('/api/signin', { email, password })
    
    if (data && data.user) {
        
        await setUserToken(data.user.token)
    } else if (data && data.error) {
        console.log('Error authenticating user', data.msg)
        return null
    } else {
        console.log('error connecting user.')
        return null
    }
    
    return data.user
}

export const initialize = async dispatch => {

    dispatch({ type: 'SET_LOADING', loading: 'Looking for user...' })
    
    const tokenFromStorage = await AsyncStorage.getItem('userToken')
    
    let user

    if (tokenFromStorage) {
        
        // if stored token found...
        dispatch({ type: 'SET_LOADING', loading: 'Init: User found. Verifying...' })

        user = await authenticate(dispatch, tokenFromStorage)    
        
        // if user token could not be verified...
        if (user) {
            // if token verified...
            await setUserToken(user.token)
            
            dispatch({ type: 'SET_USER', user })

        } else {
            await clearStorage()
        }
    }

    dispatch({ type: 'SET_LOADING', loading: null })

    return user
}

export const signin = async (email, password) => {
    
    const { data } = await axios.
        post('/api/signin', { email, password })
    
    if (!data) {
        console.log('Error: No data returned when authenticating user')
        return null
    } else if (data.user) {
        await setUserToken(data.user.token)
        console.log('signin successful')
    } else {
        console.log('Error: No data returned when authenticating user')
    }

    return data
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
        dispatch({ type: 'SIGNOUT' })
    }
}

export const signup = async (email, password, role, username) => {
    
    const newUser = await axios.
        post('/api/signup', { email, password, role, username })
    
    if (!newUser) {
        console.log('Error authenticating user')
        return null
    } else {
        await setUserToken(newUser.token)
        console.log('signup successful')
    }

    return newUser
}

export const unsubscribe = async id => {
    
    const { data } = await axios.
        post('/api/unsubscribe', { id })
    
    if (!data) {
        console.log('Error closing user account.')
        return null
    } else {
        console.log('Account closed.')
    }

    return data
}

// export const validateToken = async token => {
//     const userFromToken = await axios
//         .post('/api/token', { token })
//         // console.log('userFromToken', userFromToken)
//     const expired = (new Date(userFromToken.exp) - Date.now() > 0)
//     console.log('expired', expired)
// }

export const isValidEmail = value =>  value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)