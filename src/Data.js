import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { cleanStorage, clearStorage } from './utils/storage'

const storeToken = async token => await AsyncStorage.setItem('userToken', token)

export const authenticate = async token => {
    
    const { data } = await axios.
        post('/api/authenticate', { token })
    
    if (!data) {
        console.log('Error authenticating token')
        await clearStorage()
        return null
    }

    const { user } = data
    
    await storeToken(user.token)
    
    return user
}

export const checkStatus = async dispatch => {
        
    dispatch({ type: 'SET_LOADING', loading: 'Checking status...' })

    const userToken = await AsyncStorage.getItem('userToken')
    
    if (!userToken) return null
    
    dispatch({ type: 'SET_LOADING', loading: 'Verifying token...' })

    const response = await authenticate(userToken)

    if (!response) {
        console.log('could not authenticate; cleaning local storage...')
        await cleanStorage()
        return null
    }
    
    const { token, ...user } = response
    
    await AsyncStorage.setItem('userToken', token)

    return user
}

export const connect = async (dispatch, type) => {

    const creds = {
        customer: { email: 'customer@iameric.me', password: 'customer' },
        driver: { email: 'driver@iameric.me', password: 'driver' },
        vendor: { email: 'vendor@iameric.me', password: 'vendor' },
    }
    
    dispatch({ type: 'SET_LOADING', loading: `Connecting as ${type}...` })
    
    const { email, password } = creds[type]
    
    const { data } = await axios.
        post('/api/signin', { email, password })
    
    if (!data) {
        console.log('Error authenticating user')
        return null
    }
    
    await AsyncStorage.setItem('userToken', data.token)

    return data
}

export const getImageDataById = async id => {
    
    const { data } = await axios
        .get(`/api/image/${id}`)
    
    return data
}