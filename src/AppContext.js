import React, { createContext, useReducer } from 'react'
import { useWindowDimensions } from 'react-native'

const initialState = {
    cart: null,
    entries: null,
    featured: null,
    image: null,
    images: null,
    loading: null,
    location: null,
    modal: null,
    orders: null,
    productData: null,
    products: null,
    profile: null,
    user: null,
    users: null,
    vendor: null,
}

const reducer = (state = initialState, action) => {
    let {
        cart,
        entries,
        featured,
        image,
        images,
        loading,
        location,
        modal,
        orders,
        productData,
        products,
        profile,
        user,
        users,
    } = state
    
    switch(action.type) {
        case 'SET_MODAL':
            modal = action.modalName
            break
        case 'CLOSE_MODAL':
            // featured = null
            // image = null
            modal = null
            // productData = null
            // profile = null
            break
        case 'SET_FEATURED':
            featured = action.featured
            modal = 'FEATURED'
            break
        case 'SET_PROFILE':
            profile = action.profile
            break
        // case 'SET_PRODUCT':
        //     productData = action.productData
        //     modal = 'PRODUCT'
        //     break
        case 'SET_IMAGE':
            image = action.image
            if (image) modal = 'IMAGE'
            break
        case 'SET_IMAGES':
            images = action.images
            break
        case 'ADD_IMAGE':
            images = images ? [...images, action.image] : [action.image]
            break
        case 'SET_USER':
            user = action.user
            break
        case 'SET_LOCATION':
            location = action.location
            break
        case 'REMOVE_IMAGE':
            images = images.filter(i => i._id !== action.id)
            if (user.profileImage && user.profileImage._id === action.id) {
                user.profileImage = null
            }
            break
        case 'REMOVE_PRODUCT_IMAGE':
            products = products.map(prod => {
                if (prod.image && prod.image._id === action.imageId) return { ...prod, image: null }
                else return prod
            })
            break
        case 'SET_PRODUCT':
            productData = action.productData
            break
        case 'SET_PRODUCTS':
            products = action.products
            break
        case 'ADD_PRODUCT':
            products = [...products, action.product]
            productData = null
            modal = null
            break
        case 'UPDATE_PRODUCT':
            if (!products) products = [action.product]
            else {
                const i = products.findIndex(prod => prod._id === action.product._id)
                if (i <= -1) return
                products = [
                    ...products.slice(0, i),
                    action.product,
                    ...products.slice(i + 1),
                ]
            }
            productData = null
            modal = null
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
            break
        case 'SET_PROFILE_IMAGE':
            user = { ...user, profileImage: action.profileImage }
            break
        case 'SET_USERS':
            users = action.users
            break
        case 'ADD_TO_CART':

            const { quantity } = action
            const productVendor = action.product.vendor

            let currentOrder = null

            if (!cart) cart = [{ vendor: productVendor, items: [{ product: action.product, quantity }] }]
            else {
                let index = 0
                if (cart.length > 1)
                    index = cart.findIndex(order => order.vendor._id === productVendor._id)
                
                if (index >= -1) {
                    currentOrder = {
                        ...cart[index],
                        items: [...cart[index].items, { product: action.product, quantity }],
                    }
                } else currentOrder = { vendor: productVendor, items: [{ product: action.product, quantity }] }
                
                cart = [...cart.slice(0, index), currentOrder, ...cart.slice(index + 1)]
            }
            featured = null
            image = null
            modal = null
            productData = null
            break
        case 'CLEAR_CART':
            cart = null
            modal = null
            break
        case 'NEW_ENTRY':
            if (!entries) entries = [action.entry]
            else entries = [action.entry, ...entries]
            break
        case 'SET_ENTRIES':
            entries = action.entries
            break
        case 'DELETE_ENTRY':
            entries = entries.filter(entry => entry._id !== action.id)
            break
        case 'SET_ORDERS':
            orders = (action.orders && action.orders.length) ? action.orders : null
            break
        case 'ADD_ORDER':
            orders = orders ? [...orders, action.order] : [action.order]
            cart = null
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
                if (order._id === action.order._id) {
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
            if (!orders.length) orders = null
        break
        case 'SIGNOUT':
            console.log('signing out...')
            cart = null
            entries = null
            featured = null
            image = null
            images = null
            loading = null
            location = null
            modal = null
            orders = null
            productData = null
            products = null
            profile = null
            user = null
            users = null
        break
        default:
            throw new Error('Not valid action type')
    }

    return {
        cart,
        entries,
        featured,
        image,
        images,
        loading,
        location,
        modal,
        orders,
        productData,
        products,
        profile,
        user,
        users,
    }
}

export const AppContext = createContext({
    state: initialState,
    dispatch: null,
})

export const AppProvider = ({ children, preferences }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const usersByRole = role => state.users ? state.users.filter(u => u.role === role) : null
    const otherUsersByRole = role => (state.users && state.user) ? usersByRole(role).filter(u => u._id !== state.user._id) : null
    
    const dims = useWindowDimensions()

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
                cart: state.cart,
                customers: otherUsersByRole('customer'),
                drivers: otherUsersByRole('driver'),
                entries: state.entries,
                featured: state.featured,
                image: state.image,
                images: state.images,
                loading: state.loading,
                location: state.location,
                modal: state.modal,
                orders: state.orders,
                productData: state.productData,
                products: state.products,
                profile: state.profile,
                user: state.user,
                users: state.users,
                isLandscape: dims.width > dims.height,
                vendors: usersByRole('vendor'),
                ...preferences,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}