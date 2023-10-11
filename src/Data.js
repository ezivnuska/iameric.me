import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const cleanStorage = () => AsyncStorage.multiRemove(['userToken', 'route', 'detail'])
export const clearStorage = () => AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'email'])

const storeToken = async token => await AsyncStorage.setItem('userToken', token)

export const authenticate = async token => {
    
    const { data } = await axios.
        post('/api/authenticate', { token })
    
    if (!data) {
        console.log('Error authenticating token')
        await clearStorage()
        return null
    }

    const { user } = data
    
    await storeToken(user.token)
    
    return user
}

export const checkStatus = async dispatch => {
        
    dispatch({ type: 'SET_LOADING', loading: 'Checking Status...' })

    const userToken = await AsyncStorage.getItem('userToken')
    
    if (!userToken) return null
    
    dispatch({ type: 'SET_LOADING', loading: 'Verifying Token...' })

    const response = await authenticate(userToken)

    if (!response) {
        console.log('could not authenticate; cleaning local storage...')
        await cleanStorage()
        return null
    }
    
    dispatch({ type: 'SET_LOADING', loading: 'Customer Verified. Saving Token...' })
    
    const { token, ...user } = response
    
    await AsyncStorage.setItem('userToken', token)

    const { orders, products, vendors } = await loadData(user)
    
    if (orders) dispatch({ type: 'SET_ORDERS', orders })
    if (products) dispatch({ type: 'SET_PRODUCTS', products })
    if (vendors) dispatch({ type: 'SET_VENDORS', vendors })

    return user
}

export const connect = async (dispatch, type) => {

    const creds = {
        customer: { email: 'customer@iameric.me', password: 'customer' },
        driver: { email: 'driver@iameric.me', password: 'driver' },
        vendor: { email: 'vendor@iameric.me', password: 'vendor' },
    }
    
    dispatch({ type: 'SET_LOADING', loading: `Connecting as ${type}...` })
    
    const { email, password } = creds[type]
    
    const { data } = await axios.
        post('/api/signin', { email, password })
    
    if (!data) {
        console.log('Error authenticating user')
        return null
    }
    
    await AsyncStorage.setItem('userToken', data.token)

    const { orders, products, vendors } = await loadData(data)

    if (orders) dispatch({ type: 'SET_ORDERS', orders })
    if (products) dispatch({ type: 'SET_PRODUCTS', products })
    if (vendors) dispatch({ type: 'SET_VENDORS', vendors })

    return data
}

export const loadData = async user => {

    const orders = await getOrders(user)
    const products = user.role === 'vendor' ? await getProducts(user) : null
    const vendors = user.role === 'customer' ? await getVendors() : null

    return { orders, products, vendors }
}

export const getOrders = async user => {

    const url = () => {
        switch (user.role) {
            case 'customer':
            case 'vendor': return `/api/orders/${user._id}`
            case 'driver': return  `/api/orders`
        }
    }
    
    const { data } = await axios.get(url())
    
    if (!data) {
        console.log('could not get user orders')
        return null
    }

    return data
}

export const getVendors = async () => {
    
    const { data } = await axios.get('/api/vendors')

    if (!data) {
        console.log('Error: could not get vendors')
        return null
    }

    return data.vendors
}

export const getProducts = async user => {
    
    const { data } = await axios.get(`/api/products/${user._id}`)
    
    if (!data) {
        console.log('Error getting products:')
        return null
    }

    return data.items
}

export const getImageDataById = async id => {
    const { data } = await axios.get(`/api/images/${id}`)
    if (!data) return console.log('Error: could not get user profile image from id')
    return data
}

export const getData = async user => {
    // let array = []
    // switch (user.role) {
    //     case 'customer': array = ['orders', 'vendors']; break
    //     case 'vendor': array = ['orders', 'products']; break
    //     case 'driver': array = ['orders']; break
    // }
    
    let data = {}
    
    if (user.role === 'customer') {
        const vendorResponse = await getVendors()
        data.vendors = vendorResponse
    }

    if (user.role === 'vendor') {
        const productResponse = await getProducts(user)
        data.products = productResponse
    }

    if (user.role === 'driver') {

    }
    
    const orderResponse = await getOrders(user)
    data.orders = orderResponse

    return data
}