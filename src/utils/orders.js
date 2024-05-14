import axios from 'axios'

/**
 * 
 * @returns array of order objects
 */

export const getOrdersById = async id => {
    const { data } = await axios.get(`/api/orders/${id}`)
    if (!data) console.log('could not load orders.')
    else return data
    return null
}

export const loadUserOrders = async userId => {
    const { data } = await axios.get(`/api/orders/user/${userId}`)
    if (!data || !data.orders) console.log('could not load orders.')
    else return data.orders
    return null
}

export const deleteOrderWithId = async id => {
    const { data } = await axios.delete(`/api/order/delete/${id}`)
    if (!data || !data.order) console.log('could not delete order.')
    else return data.order
    return null
}

export const submitOrder = async order => {
    const { data } = await axios.post('/api/order', order)
    if (!data) console.log('error submitting order')
    else return data
    return null
}