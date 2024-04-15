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

    return data
}

export const loadFullUser = async userId => {

    const { data } = await axios.get(`/api/user/full/${userId}`)

    if (data) return data.user

    console.log('Error fetching user with images')

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

export const loadProducts = async vendorId => {

    const { data } = await axios.get(`/api/products/${vendorId}`)
    
    if (!data) {
        console.log('could not load products')
    } else if (!data.products || !data.products.length) {
        console.log('no products to load')
    } else {
        return data.products
    }
    return null
}

export const loadUserProducts = async vendorId => {

    const { data } = await axios.get(`/api/products/${vendorId}`)
    
    if (!data) {
        console.log('could not load products')
    } else if (!data.products) {
        console.log('no products to load')
    }

    return data
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

export const loadEntries = async () => {

    const { data } = await axios.get('/api/entries')

    if (data && data.entries) return data.entries
    
    console.log('could not load entries.')
    return null
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
    
    if (!data) {
        console.log('could not load orders.')
        return null
    }
    
    return data
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

export const getUserLocationById = async locationId => {

    const { data } = await axios.get(`/api/user/location/${locationId}`)

    if (data && data.location) return data.location

    console.log('could not get location data.')
    return null
}

export const getLocationByUserId = async userId => {

    const { data } = await axios.get(`/api/location/${userId}`)

    if (data && data.location) return data.location
    
    console.log('could not get location data.')
    return null
}