import axios from 'axios'

/**
 * 
 * users 
 *  
 */

// export const loadUsersByRole = async role => {
//     const { data } = await axios.get(`/api/${role}s`)
//     if (!data || !data.vendors) console.log(`could not load ${role}s.`)
//     else return data.vendors
//     return null
// }

export const loadContact = async id => {
    const { data } = await axios.get(`/api/user/${id}`)
    if (!data || !data.user) console.log('Error fetching user')
    else return data.user
    return null
}

export const getContactImages = async id => {
    const { data } = await axios.get(`/api/user/images/${id}`)
    if (!data || !data.images) console.log(`\nError loading contact images`)
    else return data.images
    return null
}

export const getContactLocation = async userId => {
    const { data } = await axios.get(`/api/location/${userId}`)
    if (!data || !data.location) console.log('could not get contact location data.')
    else return data.location
    return null
}

export const loadFullContact = async id => {
    const { data } = await axios.get(`/api/user/full/${id}`)
    if (!data) {
        console.log(`\nError loading contact`)
        return null
    }
    const { user, images } = data
    const response = { ...user, images }
    console.log('response', response)
    return response
}

export const loadVendor = async vendorId => {
    const { data } = await axios.get(`/api/vendor/${vendorId}`)
    if (!data || !data.vendor) console.log('could not load vendor')
    else return data.vendor
    return null
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

export const loadContacts = async () => {

    const { data } = await axios.get('/api/users')

    if (!data || !data.users) console.log('Error: could not load users')
    return data.users
}

export const loadUserById = async userId => {
    
    const { data } = await axios.get(`/api/user/${userId}`)
    
    if (data && data.user) return data.user

    console.log('could not load user details.')
    return null
}

/**
 * 
 * @returns array of users with role, 'vendor'
 */

export const loadVendors = async () => {
    const { data } = await axios.get('/api/vendors')
    if (!data.vendors) console.log('could not load vendors.')
    else return data.vendors
    return null
}

export const loadAvailableUsers = async () => {
    const { data } = await axios.get('/api/users/available')
    if (!data.users) console.log('could not load available users.')
    else return data.users
    return null
}