import React, { createContext, useReducer } from 'react'

const initialState = {
    cart: {
        vendor: null,
        items: [],
    },
    dims: null,
    images: [],
    loading: false,
    orders: [],
    products: [],
    profileImage: null,
    user: null,
    users: null,
    vendors: null,
}

const reducer = (state = initialState, action) => {
    let { cart, dims, loading, orders, products, profileImage, user, users, vendors } = state
    
    switch(action.type) {
        case 'SET_DIMS':
            dims = action.dims
            break
        case 'SET_USER':
            user = action.user
            break
        case 'REMOVE_IMAGE':
            if (user.profileImage._id === action.id) {
                user.profileImage = null
            }
            break
        case 'REMOVE_PRODUCT_IMAGE':
            products = products.map(product => {
                if (product.image && product.image._id === action.imageId) return { ...product, image: null }
                else return product
            })
            break
        case 'SET_VENDORS':
            vendors = action.vendors
            break
        case 'UPDATE_VENDOR_PRODUCTS':
            vendors = vendors.map((v, i) => {
                if (v._id === action.vendorId) {
                    v.products = action.products
                }
                return v
            })
            break
        case 'SET_PRODUCTS':
            products = action.products
            break
        case 'ADD_PRODUCT':
            products = [...products, action.product]
            break
        case 'UPDATE_PRODUCT':
            if (!products) products = []
            if (products.length) {
                const i = products.findIndex(product => product._id === action.product._id)
                if (i <= -1) return
                products = [
                    ...products.slice(0, i),
                    action.product,
                    ...products.slice(i + 1),
                ]
            }
            break
        case 'SET_PRODUCT_IMAGE_DATA':
            const i = products.findIndex(product => product._id === action.productId)
            if (i <= -1) return
            const updatedProduct = products[i]
            updatedProduct.image = action.imageData
            products = [
                ...products.slice(0, i),
                updatedProduct,
                ...products.slice(i + 1),
            ]
            break
        case 'UPDATE_PRODUCT_IMAGE':
            const userProducts = products || []
            let updatedUserProducts
            if (userProducts.length) {
                 updatedUserProducts = userProducts.map(product => {
                    if (product.image && product.image !== action.imageId) {
                        return {
                            ...product,
                            image: action.imageId,
                        }
                    } else return product
                })
            }
            products = updatedUserProducts
            break
        case 'REMOVE_PRODUCT':
            products = products.filter(product => product._id !== action.productId)
            break
        case 'SET_LOADING':
            const wasLoading = loading
            if (wasLoading && !action.loading) console.log('Loading stopped.')
            loading = action.loading
            if (loading) console.log('>>', loading)
            break
        case 'SET_PROFILE_IMAGE':
            user = { ...user, profileImage: action.profileImage }
            break
        case 'SET_USERS':
            users = action.users
            break
        case 'ADD_TO_CART':
            cart = {
                vendor: action.vendor,
                items: [...cart.items, action.item],
            }
            break
        case 'CLEAR_CART':
            cart = { vendor: null, items: null }
            break
        case 'SET_ORDERS':
            orders = action.orders
            break
        case 'ADD_ORDER':
            orders = [...orders, action.order]
            cart = { vendor: null, items: null }
            break
        case 'CONFIRM_ORDER':
            orders = orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        confirmed: action.order.confirmed,
                    }
                } else return order
            })
        break
        case 'ORDER_READY':
            orders = orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        ready: action.order.ready,
                    }
                } else return order
            })
        break
        case 'ACCEPT_ORDER':
            orders = orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        accepted: action.order.accepted,
                        driver: action.order.driver,
                    }
                } else return order
            })
        break
        case 'DRIVER_ARRIVED':
            orders = orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        arrived: action.order.arrived,
                    }
                } else return order
            })
        break
        case 'ORDER_RECEIVED':
            orders = orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        received: action.order.recieved,
                    }
                } else return order
            })
        break
        case 'COMPLETE_ORDER':
            orders = orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        delivered: action.order.delivered,
                    }
                } else return order
            })
        break
        case 'CLOSE_ORDER':
            orders = orders.map(order => {
                if (order._id == action.order._id) {
                    return {
                        ...order,
                        status: action.order.status,
                        closed: action.order.closed,
                    }
                } else return order
            })
        break
        case 'REMOVE_ORDER':
            orders = orders.filter(order => order._id != action.id)
        break
        case 'SET_STATUS':
            statuses.push(action.status)
        break
        case 'SIGNOUT':
            cart = {
                vendor: null,
                items: [],
            }
            loading = null
            orders = null
            products = null
            profileId = null
            user = null
            users = null
            vendors = null
        break
        default:
            throw new Error('Not valid action type')
    }

    return { cart, dims, loading, orders, products, profileImage, user, users, vendors }
}

export const AppContext = createContext({
    state: initialState,
    dispatch: null,
})

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
        <AppContext.Provider value={{
            state,
            dispatch,
            cart: state.cart,
            dims: state.dims,
            loading: state.loading,
            orders: state.orders,
            products: state.products,
            user: state.user,
            vendors: state.vendors,
        }}>
            {children}
        </AppContext.Provider>
    )
}