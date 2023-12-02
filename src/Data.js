import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { cleanStorage, clearStorage } from './utils/storage'

export const authenticate = async token => {
    
    const { data } = await axios.
        post('/api/authenticate', { token })
    
    if (!data) {
        console.log('Error authenticating token')
        await clearStorage()
        return null
    }
    
    const { user } = data
    
    await AsyncStorage.setItem('userToken', user.token)
    
    return user
}

export const checkStatus = async () => {
    
    const userToken = await AsyncStorage.getItem('userToken')
    
    if (!userToken) return null
    
    const userVerified = await authenticate(userToken)
    
    if (!userVerified) {
        console.log('could not authenticate; cleaning local storage...')
        await cleanStorage()
        return null
    }
    
    const { token, ...user } = userVerified
    
    await AsyncStorage.setItem('userToken', token)

    return user
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
    
    if (!data) {
        console.log('Error authenticating user')
        return null
    }
    
    await AsyncStorage.setItem('userToken', data.token)

    return data
}

export const signin = async (email, password) => {
    
    const { data } = await axios.
        post('/api/signin', { email, password })
    
    if (!data) {
        console.log('Error authenticating user')
        return null
    }
    console.log('signin successful. setting user token.')

    await AsyncStorage.setItem('userToken', data.token)

    return data
}

export const getImageDataById = async id => {
    
    const { data } = await axios
        .get(`/api/image/${id}`)
    
    return data
}