import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { cleanStorage, clearStorage, getUserToken, setUserToken } from './utils/storage'

export const authenticate = async token => {
    
    const { data } = await axios.
        post('/api/authenticate', { token })
    
    if (!data) {
        console.log('Error authenticating token')
        await clearStorage()
        return null
    }
    
    const { user } = data
    
    await setUserToken(user.token)
    
    return user
}

export const checkStatus = async () => {
    
    const userToken = await getUserToken('userToken')
    
    if (!userToken) return null
    
    const userVerified = await authenticate(userToken)
    
    if (!userVerified) {
        console.log('could not authenticate; cleaning local storage...')
        await cleanStorage()
        return null
    }
    
    const { token, ...user } = userVerified
    // console.log('setUserToken', token)
    await setUserToken(token)

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
    
    // console.log('connect-->', data)
    if (data && data.user) {
        // console.log('setUserToken', data.user.token)
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
        return data
    }

    return data
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

export const getImageDataById = async id => {
    
    const { data } = await axios
        .get(`/api/image/${id}`)
    
    return data
}