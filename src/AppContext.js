import React, { createContext, useReducer } from 'react'

const initialState = {
    cart: {
        vendor: null,
        items: [],
    },
    dims: null,
    images: [],
    loading: false,
    orders: null,
    products: null,
    profileId: null,
    profileImage: null,
    user: null,
    users: null,
    vendors: null,
}

const reducer = (state = initialState, action) => {
    let { cart, dims, loading, orders, products, profileId, profileImage, user, users, vendors } = state
    
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
        case 'ADD_IMAGE':
            user.images = [...user.images, action.image]
            break
        case 'UPDATE_IMAGE':
            user.images = user.images.map(image => {
                if (action.image._id === image || action.image._id === image._id) {
                    return action.image
                } else return image
            })
            break
        case 'REMOVE_IMAGE':
            let imageIndex = user.images.findIndex(image => image._id === action.id)
            const images = [
                ...user.images.slice(0, imageIndex),
                ...user.images.slice(imageIndex + 1),
            ]
            user.images = images
            
            if (user.profileImage === action.id) {
                profileImage = null
                user.profileImage = null
            }

            break
        case 'REMOVE_PRODUCT_IMAGE':
            const newProducts = user.products.map(product => {
                if (product.imageId === action.imageId) return { ...product, imageId: null }
                else return product
            })
            user = {
                ...user,
                products: newProducts,
            }
            break
        case 'SET_VENDORS':
            vendors = action.vendors
            break
        case 'UPDATE_VENDOR_PRODUCTS':
            let index
            vendors.map((v, i) => {
                if (v._id === action.vendor) index = i
            })
            vendors[index].products = action.products
            break
        case 'SET_PRODUCTS':
            products = action.productIds
            break
        case 'ADD_PRODUCT':
            products = [...action.products, action.product]
            break
        case 'UPDATE_PRODUCT':
            if (!products) products = []
            if (products.length) {
                const i = products.findIndex(product => {
                    const id = product._id || product
                    return id === action.productData._id
                })
                if (i <= -1) return
                products = [
                    ...products.slice(0, i),
                    action.productData,
                    ...products.slice(i + 1),
                ]
            }
            break
        case 'UPDATE_PRODUCT_IMAGE':
            const userProducts = products || []
            let updatedUserProducts
            if (userProducts.length) {
                 updatedUserProducts = userProducts.map(product => {
                    if (product.imageId && product.imageId === action.imageId) {
                        return {
                            ...product,
                            imageId: action.imageId,
                        }
                    } else return product
                })
            }
            products = updatedUserProducts
            break
        case 'REMOVE_PRODUCT':
            if (!products) return
            products = products.filter(productId => productId !== action.productId)
            break
        case 'SET_LOADING':
            const wasLoading = loading
            if (wasLoading && !action.loading) console.log('Loading stopped.')
            loading = action.loading
            if (loading) console.log('>>', loading)
            break
        case 'SET_PROFILE_IMAGE':
            console.log('SET_PROFILE_IMAGE', action.profileImage)
            user = { ...user, profileImage: action.profileImage ? action.profileImage._id : null }
            profileImage = action.profileImage
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
            orders = action.orderIds
            console.log('orders set', orders)
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

    return { cart, dims, loading, orders, products, profileId, user, users, vendors }
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
            images: state.user ? state.user.images : null,
            loading: state.loading,
            orders: state.orders,
            products: state.products,
            user: state.user,
            vendors: state.vendors,
            profileImage: state.profileImage,
        }}>
            {children}
        </AppContext.Provider>
    )
}