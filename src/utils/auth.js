import { cleanStorage, clearStorage, setToken } from './storage'
import axios from 'axios'

export const authenticate = async token => {
    
    const { data } = await axios.
        post('/api/authenticate', { token })
    
    if (!data) {
        console.log('Error authenticating token')
        await clearStorage()
        return null
    } else {
        const { user } = data
        return user
    }
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
        console.log('error connecting user.')
    } else if (data.error) {
        console.log('Error authenticating user', data.msg)
    } else {
        return data
    }
    
    return null
}

export const signin = async (email, password) => {
    
    const { data } = await axios.
        post('/api/signin', { email, password })
        
    if (!data) {
        console.log('Error: No data returned when authenticating user')
    } else if (data.error) {
        console.log('Error:', data.error)
    } else {
        console.log(`${data.user.username} connected.`)
    }
    return data
}

export const signup = async (email, password, role, username) => {
    
    const data = await axios.
        post('/api/signup', { email, password, role, username })
    
    if (!data) {
        console.log('Error authenticating user')
        return null
    } else if (data.error) {
        console.log('Error:', data.error)
    } else {
        console.log('signup successful')
    }

    return data
}

export const signout = async userId => {
    
    const { data } = await axios
        .post('/api/signout', { _id: userId })
    
    if (!data) {
        console.log('could not sign out user')
        return false
    } else {
        await cleanStorage()
        console.log('signed out')
        return true
    }
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

// export const validateToken = async token => {
//     const userFromToken = await axios
//         .post('/api/token', { token })
//         // console.log('userFromToken', userFromToken)
//     const expired = (new Date(userFromToken.exp) - Date.now() > 0)
//     console.log('expired', expired)
// }

export const isValidEmail = value => value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)