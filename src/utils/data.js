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

export const loadUser = async (dispatch, userId) => {

    dispatch({ type: 'SET_LOADING', loading: 'Fetching user...' })

    const { data } = await axios.get(`/api/user/${userId}`)

    if (!data) {
        console.log('Error fetching user')
    } else if (!data.user) {
        console.log('User not found')
    } else {
        dispatch({ type: 'UPDATE_USER', user: data.user })
    }

    dispatch({ type: 'SET_LOADING', loading: null })

    return data.user
}

export const loadUsers = async dispatch => {

    dispatch({ type: 'SET_LOADING', loading: 'Fetching users...' })

    const { data } = await axios.get('/api/users')

    if (!data) {
        console.log('Error fetching users')
    } else if (!data.users) {
        console.log('No users found')
    } else {
        dispatch({ type: 'SET_USERS', users: data.users })
    }

    dispatch({ type: 'SET_LOADING', loading: null })
}

export const loadUserById = async id => {
    
    const { data } = await axios.get(`/api/user/${id}`)
    
    if (!data.user) {
        console.log('could not load user details.')
        return null
    }

    return data.user
}

export const loadUserDetails = async (dispatch, userId) => {

    dispatch({ type: 'SET_LOADING', loading: 'Loading user details...' })
        
    const { data } = await axios.get(`/api/user/details/${userId}`)
    
    if (!data) {
        console.log('could not load user details with id:', userId)
    } else if (!data.user) {
        console.log('No user found with id:', userId)
    } else {
        dispatch({ type: 'SET_USER', user: data.user })
    }
    
    dispatch({ type: 'SET_LOADING', loading: null })
}

/**
 * 
 * products 
 *  
 */

export const loadProducts = async vendorId => {

    const { data } = await axios.get(`/api/products/${vendorId}`)
    
    if (!data) {
        console.log('could not load products.')
        return null
    }

    return data.products
}

export const deleteProductWithId = async id => {
    
    const { data } = await axios.delete(`/api/products/delete/${id}`)

    if (!data.product) {
        console.log('Error deleting product')
        return null
    }

    return data.product
}

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

/**
 * 
 * @returns array of entry objects
 */

export const loadEntries = async dispatch => {

    dispatch({ type: 'SET_LOADING', loading: 'loading forum...' })

    const { data } = await axios.get('/api/entries')

    if (!data) {
        console.log('could not load entries.')
    } else if (!data.entries) {
        console.log('no entries found.')
    } else {
        dispatch({ type: 'SET_ENTRIES', entries: data.entries })
    }

    dispatch({ type: 'SET_LOADING', loading: null })
}

export const deleteEntryWithId = async id => {
    
    const { data } = await axios.delete(`/api/entry/delete/${id}`)

    if (!data.entry) {
        console.log('Error deleting product')
        return null
    }

    return data.entry
}

/**
 * 
 * @returns array of order objects
 */

export const getOrdersById = async id => {
    
    const { data } = await axios.get(`/api/orders/${id}`)
    
    if (!data.orders) {
        console.log('could not load orders.')
        return null
    }
    
    return data.orders
}

export const loadUserOrders = async userId => {

    const { data } = await axios.get(`/api/orders/user/${userId}`)

    if (!data) {
        console.log('could not load orders.')
        return null
    }

    return data.orders
}

export const deleteOrderWithId = async id => {
    
    const { data } = await axios.delete(`/api/order/delete/${id}`)

    if (!data.order) {
        console.log('could not delete order.')
        return null
    }

    return data.order
}

/**
 * 
 * @param id
 * @returns 
 */

export const getUserLocationById = async (dispatch, locationId) => {

    dispatch({ type: 'SET_LOADING', loading: 'Loading user location...' })

    const { data } = await axios.get(`/api/user/location/${locationId}`)

    if (!data) {
        console.log('could not get location data.')
    } else if (!data.location) {
        console.log('No location found.')
    } else {
        console.log('data.location===>', data.location)
        dispatch({ type: 'UPDATE_USER_LOCATION_WITH_LOCATION_ID', location: data.location })
    }

    dispatch({ type: 'SET_LOADING', loading: null })
}

export const getLocationByUserId = async (dispatch, userId) => {

    dispatch({ type: 'SET_LOADING', loading: 'Loading user location...' })

    const { data } = await axios.get(`/api/location/${userId}`)

    if (!data) {
        console.log('could not get location data.')
    } else if (!data.location) {
        console.log('No location found.')
    } else {
        console.log('data.location===>', data.location)
        dispatch({ type: 'UPDATE_USER_LOCATION', userId, location: data.location })
    }

    dispatch({ type: 'SET_LOADING', loading: null })
}