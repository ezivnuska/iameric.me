import axios from 'axios'


/**
 * 
 * users 
 *  
 */

export const loadUsers = async () => {
    const { data } = await axios.get('/api/users')
    
    if (!data.users) {
        console.log('could not load users.')
        return null
    }

    return data.users
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

export const loadEntries = async () => {

    const { data } = await axios.get('/api/entries')

    if (!data.entries) {
        console.log('could not load entries.')
        return null
    }

    return data.entries
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

export const loadOrders = async () => {

    const { data } = await axios.get('/api/orders')

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

export const getLocationWithUserId = async id => {

    const { data } = await axios.get(`/api/location/${id}`)

    if (!data) {
        console.log('could not get location data.')
        return null
    }

    return data.location
}