import React, { createContext, useReducer } from 'react'

const initialState = {
    cart: {
        vendor: null,
        items: null,
    },
    dims: null,
    loading: false,
    orders: null,
    profileId: null,
    ready: false,
    statuses: [],
    user: null,
    users: null,
    vendors: null,
}

const reducer = (state = initialState, action) => {
    let { cart, dims, ready, loading, orders, profileId, statuses, user, users, vendors } = state

    switch(action.type) {
        case 'SET_DIMS':
            dims = action.dims
            break
        case 'SET_USER':
            user = action.user
            break
        case 'SET_USER_IMAGES':
            user.images = action.images
            break
        case 'REMOVE_IMAGE':
            console.log('removing image: user', user)
            const updatedImages = user.images.filter(image => image._id !== action.id)
            user = {
                ...user,
                profileImage: user.profileImage !== action.id ? user.profileImage : null,
                images: updatedImages,
            }
            break
        case 'SET_VENDORS':
            vendors = action.vendors
            break
        case 'SET_PRODUCTS':
            let index
            vendors.map((v, i) => {
                if (v._id === action.vendor) index = i
            })
            vendors[index].products = action.products
            break
        case 'SET_LOADING':
            loading = action.loading
            if (loading) ready = false
            console.log('>>', loading)
            break
        case 'READY':
            ready = true
            loading = null
            console.log('READY')
            break
        case 'SET_PROFILE_IMAGE':
            user = { ...user, profileImage: action.profileImage }
            break
        case 'SET_USERS':
            users = action.users
            break
        case 'SET_FEATURED_USER':
            profileId = action.id
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
            // console.log('setting orders', action.orders)
            orders = action.orders
            // console.log('orders set', orders)
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
            ready = true
            loading = false
            orders = null
            products = null
            profileId = null
            statuses = ['Signed Out']
            user = null
            users = null
            vendors = null
        break
        default:
            throw new Error('Not valid action type')
    }

    return { cart, dims, ready, loading, orders, profileId, statuses, user, users, vendors }
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
            ready: state.ready,
            loading: state.loading,
            orders: state.orders,
            status: state.statuses[state.statuses.length],
            user: state.user,
            vendors: state.vendors,
        }}>
            {children}
        </AppContext.Provider>
    )
}