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
        
    dispatch({ type: 'SET_LOADING', loading: 'Checking status...' })

    const userToken = await AsyncStorage.getItem('userToken')
    
    if (!userToken) return null
    
    dispatch({ type: 'SET_LOADING', loading: 'Verifying token...' })

    const response = await authenticate(userToken)

    if (!response) {
        console.log('could not authenticate; cleaning local storage...')
        await cleanStorage()
        return null
    }
    
    dispatch({ type: 'SET_LOADING', loading: 'Loading data...' })
    
    const { token, ...user } = response
    
    await AsyncStorage.setItem('userToken', token)

    const { orderIds, productIds, vendorIds } = await loadData(user, dispatch)
    
    if (orderIds) {
        // dispatch({ type: 'SET_LOADING', loading: 'Loading orders...' })
        dispatch({ type: 'SET_ORDERS', orderIds })
    }
    if (productIds) {
        // dispatch({ type: 'SET_LOADING', loading: 'Loading products...' })
        dispatch({ type: 'SET_PRODUCTS', productIds })
    }
    if (vendorIds) {
        // dispatch({ type: 'SET_LOADING', loading: 'Loading vendors...' })
        dispatch({ type: 'SET_VENDORS', vendorIds })
    }

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

    const { orderIds, productIds, vendorIds } = await loadData(data, dispatch)

    if (orderIds) dispatch({ type: 'SET_ORDERS', orderIds })
    if (productIds) dispatch({ type: 'SET_PRODUCTS', productIds })
    if (vendorIds) dispatch({ type: 'SET_VENDORS', vendorIds })

    return data
}

export const loadData = async (user, dispatch) => {

    const orderIds = await getOrders(dispatch, user)
    console.log('orderIds:', orderIds)
    const productIds = user.role === 'vendor' ? await getProducts(dispatch, user) : null
    console.log('productIds:', productIds)
    const vendorIds = user.role === 'customer' ? await getVendors(dispatch) : null
    console.log('vendorIds:', vendorIds)

    return { orderIds, productIds, vendorIds }
}

export const getOrders = async (dispatch, user) => {

    dispatch({ type: 'SET_LOADING', loading: 'Checking orders...' })

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

    return data.orderIds
}

export const getVendors = async dispatch => {
    
    dispatch({ type: 'SET_LOADING', loading: 'Loading vendors...' })
    
    const { data } = await axios.get('/api/vendors')

    if (!data) {
        console.log('Error: could not get vendors')
        return null
    }

    return data.vendorIds
}

export const getProducts = async (dispatch, user) => {

    dispatch({ type: 'SET_LOADING', loading: 'Loading products...' })
    
    const { data } = await axios.get(`/api/products/${user._id}`)
    
    if (!data) {
        console.log('Error getting products:')
        return null
    }

    return data.productIds
}

export const getImageDataById = async id => {
    console.log('getting image data by id...')
    const { data } = await axios
        .get(`/api/image/${id}`)
        .populate('user', 'username')
    
    console.log('image data by id:', data)
    
    return data
}

export const getData = async (dispatch, user) => {
    // let array = []
    // switch (user.role) {
    //     case 'customer': array = ['orders', 'vendors']; break
    //     case 'vendor': array = ['orders', 'products']; break
    //     case 'driver': array = ['orders']; break
    // }
    
    let data = {}
    
    if (user.role === 'customer') {
        const vendorResponse = await getVendors(dispatch)
        data.vendors = vendorResponse
    }

    if (user.role === 'vendor') {
        const productResponse = await getProducts(dispatch, user)
        data.products = productResponse
    }

    if (user.role === 'driver') {

    }
    
    const orderResponse = await getOrders(dispatch, user)
    data.orders = orderResponse

    return data
}