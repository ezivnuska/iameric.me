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

export const loadUser = async userId => {

    const { data } = await axios.get(`/api/user/${userId}`)

    if (!data) {
        console.log('Error fetching user')
    } else if (!data.user) {
        console.log('User not found')
    }

    return data.user
}

export const loadFullUser = async userId => {

    // dispatch({ type: 'SET_LOADING', loading: 'Fetching user with images...' })

    const { data } = await axios.get(`/api/user/full/${userId}`)

    if (!data) {
        console.log('Error fetching user with images')
    } else if (!data.user) {
        console.log('User not found')
    }
    //  else {

    //     dispatch({ type: 'UPDATE_USER', user: data.user })
    // }

    // dispatch({ type: 'SET_LOADING', payload: null })

    return data.user
}

export const loadUserAndImages = async (dispatch, userId) => {

    dispatch({ type: 'SET_LOADING', payload: 'Fetching user and images...' })

    const { data } = await axios.get(`/api/user/${userId}`)

    if (!data) {
        console.log('Error fetching user')
    } else if (!data.user) {
        console.log('User not found')
    } else {

        dispatch({ type: 'UPDATE_USER', payload: data.user })
    }

    dispatch({ type: 'SET_LOADING', payload: null })

    return data.user
}

export const loadUsers = async () => {

    const { data } = await axios.get('/api/users')

    return data && data.users
        ? data.users
        : null
}

export const loadUserById = async (dispatch, userId) => {

    dispatch({ type: 'SET_LOADING', payload: 'Loading user...' })
    
    const { data } = await axios.get(`/api/user/${userId}`)
    
    if (!data) {
        console.log('could not load user details.')
    } else if (!data.user) {
        console.log('no user found')
    } else {
        dispatch({ type: 'UPDATE_USER', payload: data.user })
    }

    dispatch({ type: 'SET_LOADING', payload: null })
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
 * products 
 *  
 */

export const loadProduct = async productId => {

    const product = await axios.get(`/api/product/${productId}`)
    
    if (!product) {
        console.log('could not load product')
    }

    return product
}

// export const loadProducts = async (dispatch, vendorId) => {

//     dispatch({ type: 'SET_LOADING', payload: 'Loading products...' })

//     const { data } = await axios.get(`/api/products/${vendorId}`)
    
//     if (!data) {
//         console.log('could not load products')
//     } else if (!data.products || !data.products.length) {
//         console.log('no products to load')
//     } else {
//         dispatch({ type: 'UPDATE_PRODUCTS', userId: vendorId, products: data.products })
//     }

//     dispatch({ type: 'SET_LOADING', payload: null })
// }

export const loadUserProducts = async vendorId => {

    const { data } = await axios.get(`/api/products/${vendorId}`)
    
    if (!data) {
        console.log('could not load products')
    } else if (!data.products || !data.products.length) {
        console.log('no products to load')
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

    dispatch({ type: 'SET_LOADING', payload: 'loading forum...' })

    const { data } = await axios.get('/api/entries')

    if (!data) {
        console.log('could not load entries.')
    } else if (!data.entries) {
        console.log('no entries found.')
    } else {
        dispatch({ type: 'SET_ENTRIES', payload: data.entries })
    }

    dispatch({ type: 'SET_LOADING', payload: null })
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

    dispatch({ type: 'SET_LOADING', payload: 'Loading user location...' })

    const { data } = await axios.get(`/api/user/location/${locationId}`)

    if (!data) {
        console.log('could not get location data.')
    } else if (!data.location) {
        console.log('No location found.')
    } else {
        dispatch({
            type: 'UPDATE_USERS_LOCATION_WITH_LOCATION_ID',
            payload: data.location,
        })
    }

    dispatch({ type: 'SET_LOADING', payload: null })
}

export const getLocationByUserId = async (dispatch, userId) => {

    dispatch({ type: 'SET_LOADING', payload: 'Loading user location...' })

    const { data } = await axios.get(`/api/location/${userId}`)

    if (!data) {
        console.log('could not get location data.')
    } else if (!data.location) {
        console.log('No location found.')
    } else {
        dispatch({
            type: 'UPDATE_USERS_LOCATION',
            payload: {
                userId,
                location: data.location,
            },
        })
    }

    dispatch({ type: 'SET_LOADING', payload: null })
}