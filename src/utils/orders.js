import axios from 'axios'

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