import React, { createContext, useReducer } from 'react'

const initialState = {
    cart: {
        vendor: null,
        items: [],
    },
    dims: null,
    entries: null,
    images: null,
    loading: false,
    orders: null,
    products: null,
    profileImage: null,
    user: null,
    users: null,
    verified: false,
}

const reducer = (state = initialState, action) => {
    let { cart, dims, entries, loading, orders, products, profileImage, user, users, verified } = state
    
    switch(action.type) {
        case 'SET_DIMS':
            dims = action.dims
            break
        case 'SET_VERIFIED':
            verified = action.verified
            break
        case 'SET_USER':
            user = action.user
            break
        case 'UPDATE_LOCATION':
            user.location = action.location
            break
        case 'REMOVE_IMAGE':
            if (user.profileImage && user.profileImage._id === action.id) {
                user.profileImage = null
            }
            break
        case 'REMOVE_PRODUCT_IMAGE':
            products = products.map(product => {
                if (product.image && product.image._id === action.imageId) return { ...product, image: null }
                else return product
            })
            break
        case 'UPDATE_VENDOR_PRODUCTS':
            users = users.map((v, i) => {
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
            if (!products) products = [action.product]
            else {
                const i = products.findIndex(product => product._id === action.product._id)
                if (i <= -1) return
                products = [
                    ...products.slice(0, i),
                    action.product,
                    ...products.slice(i + 1),
                ]
            }
            break
        case 'UPDATE_PRODUCT_IMAGE':
            products = products.map(product => {
                if (product._id === action.productId) {
                    return {
                        ...product,
                        image: action.image,
                    }
                } else return product
            })
            break
        case 'DELETE_PRODUCT':
            products = products.filter(product => product._id !== action.id)
            break
        case 'SET_LOADING':
            loading = action.loading
            // if (loading) console.log('>>', loading)
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
        case 'NEW_ENTRY':
            entries = [...entries, action.entry]
            break
        case 'SET_ENTRIES':
            entries = action.entries
            break
        case 'DELETE_ENTRY':
            entries = entries.filter(entry => entry._id !== action.id)
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
        case 'SIGNOUT':
            console.log('signing out...')
            cart = {
                vendor: null,
                items: [],
            }
            entries = null
            loading = null
            orders = null
            products = null
            profileId = null
            user = null
            users = null
            verified = false
        break
        default:
            throw new Error('Not valid action type')
    }

    return { cart, dims, entries, loading, orders, products, profileImage, user, users, verified }
}

export const AppContext = createContext({
    state: initialState,
    dispatch: null,
})


export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const usersByRole = role => state.users ? state.users.filter(u => u.role === role) : null
    const otherUsersByRole = role => (state.users && state.user) ? usersByRole(role).filter(u => u._id !== state.user._id) : null
    
    return (
        <AppContext.Provider value={{
            state,
            dispatch,
            cart: state.cart,
            customers: otherUsersByRole('customer'),
            dims: state.dims,
            drivers: otherUsersByRole('driver'),
            entries: state.entries,
            loading: state.loading,
            orders: state.orders,
            products: state.products,
            user: state.user,
            users: state.users,
            vendors: usersByRole('vendor'),
            verified: state.verified,
        }}>
            {children}
        </AppContext.Provider>
    )
}