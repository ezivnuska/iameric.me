import axios from 'axios'

/**
 * 
 * users 
 *  
 */

export const loadUsersByRole = async role => {
    const { data } = await axios.get(`/api/users/${role}`)
    
    if (!data.users) {
        console.log(`could not load ${role}s.`)
        return null
    }

    return data.users
}

export const loadContact = async id => {

    const { data } = await axios.get(`/api/user/${id}`)

    if (!data || !data.user) {
        console.log('Error fetching user')
    }

    return data
}

export const getContactImages = async id => {
    const { data } = await axios.get(`/api/user/images/${id}`)
    if (!data) console.log(`\nError loading contact images`)
    else return data.images
}

// NOT USED
// export const loadUserAndImages = async (dispatch, userId) => {

//     dispatch({ type: 'SET_LOADING', payload: 'Fetching user and images...' })

//     const { data } = await axios.get(`/api/user/${userId}`)

//     if (!data) {
//         console.log('Error fetching user')
//     } else if (!data.user) {
//         console.log('User not found')
//     } else {

//         dispatch({ type: 'UPDATE_USER', payload: data.user })
//     }

//     dispatch({ type: 'SET_LOADING', payload: null })

//     return data.user
// }

export const loadUsers = async () => {

    const { data } = await axios.get('/api/users')

    if (!data || !data.users) {
        console.log('Error: could not load users')
        return null
    }
    return data
}

export const loadUserById = async userId => {
    
    const { data } = await axios.get(`/api/user/${userId}`)
    
    if (data && data.user) return data.user

    console.log('could not load user details.')
    return null
}

// NOT USED
// export const loadUserDetails = async (dispatch, userId) => {

//     dispatch({ type: 'SET_LOADING', payload: 'Loading user details...' })
        
//     const { data } = await axios.get(`/api/user/details/${userId}`)
    
//     if (!data) {
//         console.log('could not load user details with id:', userId)
//     } else if (!data.user) {
//         console.log('No user found with id:', userId)
//     } else {
//         dispatch({ type: 'SET_USER', payload: data.user })
//     }
    
//     dispatch({ type: 'SET_LOADING', payload: null })
// }

/**
 * 
 * @returns array of users with role, 'vendor'
 */

export const loadVendors = async () => {
    
    const { data } = await axios.get('/api/vendors')
    
    if (!data.vendors) {
        console.log('could not load vendors.')
        return null
    }
    
    return data.vendors
}