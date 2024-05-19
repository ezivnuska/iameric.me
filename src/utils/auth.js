import { cleanStorage, clearStorage, storeToken } from './storage'
import axios from 'axios'

export const authenticate = async token => {
    console.log('authenticating...')
    const { data } = await axios.
        post('/api/authenticate', { token })
    
    if (!data || !data.user) {
        console.log('Error authenticating token')
        // await clearStorage()
    } else {
        console.log(`${data.user.username} identified`)
        return data.user
    }
    return null
}

export const connect = async type => {
    // console.log('connect', type)
    const creds = {
        customer: { email: 'customer@iameric.me', password: 'customer' },
        driver: { email: 'driver@iameric.me', password: 'driver' },
        vendor: { email: 'vendor@iameric.me', password: 'vendor' },
    }
    
    const { email, password } = creds[type]

    const user = await signin(email, password)
    // console.log('connected user', user)
    return user

    // console.log(`connecting with emeil: ${email}`)
    
    // const { data } = await axios.
    //     post('/api/signin', { email, password })
    
    // if (!data || !data.user) {
    //     console.log('error connecting user.')
    // } else if (data.error) {
    //     console.log('Error authenticating user', data.msg)
    // } else {
    //     console.log(`${data.user.username} connected.`)
    //     return data.user
    // }
    
    // return null
}

export const signin = async (email, password) => {
    const { data } = await axios.post('/api/signin', { email, password })
    if (!data) console.log('Error: No data returned when authenticating user')
    else if (data.error) console.log('Error:', data.error)
    else return data.user
    return null
}

export const signup = async (email, password, role, username) => {
    
    const { data } = await axios.
        post('/api/signup', { email, password, role, username })
    
    if (!data) {
        console.log('Error authenticating user')
    } else if (data.error) {
        console.log('Error:', data.error)
    } else {
        console.log(`${data.user.username} signed up.`)
        return data.user
    }
    
    return null
}

export const signout = async id => {
    const { data } = await axios.get(`/api/signout/${id}`)
    if (!data) console.log('could not sign out user')
    else {
        await cleanStorage()
        return data
    }
    return null
}

export const unsubscribe = async id => {
    
    const { data } = await axios.
        post('/api/unsubscribe', { id })
    
    if (!data) {
        console.log('Error closing user account.')
    } else if (data.error) {
        console.log(`Error unsubscribing:`, data.error)
    } else {
        console.log('Account closed.')
        return true
    }
    return false
}

export const validateToken = async token => {
    const { data } = await axios.get(`/api/token/${token}`)
    if (!data) console.log('error validating token')
    else {
        const expired = (new Date(data.exp) - Date.now() > 0)
        if (expired) console.log('token expired')
        else return data
    }
    return null
}

export const isValidEmail = value => value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)