import axios from 'axios'

/**
 * 
 * @returns array of order objects
 */

export const getAllOrders = async () => {
    const { data } = await axios.get(`/api/orders/all`)
    if (!data || !data.orders) console.log('could not load all orders.')
    else return data.orders
    return null
}

export const getOrdersById = async id => {
    const { data } = await axios.get(`/api/orders/${id}`)
    if (!data) console.log('could not load orders.')
    else return data
    return null
}

export const loadUserOrders = async (role, userId) => {
    const { data } = await axios.get(`/api/orders/${role}/${userId}`)
    if (!data || !data.orders) console.log('could not load orders.')
    else return data.orders
    return null
}

export const deleteOrderWithId = async id => {
    const { data } = await axios.delete(`/api/order/${id}`)
    if (!data || !data.order) console.log('could not delete order.')
    else return data.order
    return null
}

export const submitOrder = async order => {
    const { data } = await axios.post('/api/order', order)
    if (!data || !data.order) console.log('error submitting order')
    else return data.order
    return null
}

export const setOrderConfirmed = async (id, pickup) => {
    const { data } = await axios.post('/api/order/confirm', { id, pickup })
    if (!data || !data.order) console.log('error marking order confirmed')
    else return data.order
    return null
}

export const setOrderAccepted = async (id, driver) => {
    const { data } = await axios.post('/api/order/accept', { id, driver })
    if (!data || !data.order) console.log('error marking order accepted')
    else return data.order
    return null
}

export const setOrderReady = async id => {
    const { data } = await axios.post('/api/order/ready', { id })
    if (!data || !data.order) console.log('error marking order ready')
    else return data.order
    return null
}

export const setDriverArrived = async id => {
    const { data } = await axios.post('/api/order/arrived', { id })
    if (!data || !data.order) console.log('error marking driver arrival')
    else return data.order
    return null
}

export const setOrderReceived = async id => {
    const { data } = await axios.post('/api/order/received', { id })
    if (!data || !data.order) console.log('error marking order received')
    else return data.order
    return null
}

export const setOrderCompleted = async id => {
    const { data } = await axios.post('/api/order/complete', { id })
    if (!data || !data.order) console.log('error marking order completed')
    else return data.order
    return null
}

export const setOrderClosed = async id => {
    const { data } = await axios.post('/api/order/close', { id })
    if (!data || !data.order) console.log('error marking order closed')
    else return data.order
    return null
}