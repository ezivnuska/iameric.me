import axios from 'axios'

export const loadData = async user => {
    
    const orders = await getOrders(user)
    const vendors = await getVendors(user)

    return { orders, vendors }
}

const getOrders = async user => {

    const url = () => {
        switch (user.role) {
            case 'customer':
            case 'vendor': return `/api/orders/${user._id}`
            case 'driver': return  `/api/orders`
        }
    }
    
    const { data } = await axios.get(url())
    
    if (!data) return console.log('could not get user orders')

    return data
}

const getVendors = async () => {
    
    const { data } = await axios.get('/api/vendors')

    if (!data) return console.log('Error: could not get vendors')

    return data.vendors
}