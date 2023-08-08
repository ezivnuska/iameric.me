import React, { createContext, useReducer } from 'react'

const initialState = {
    cart: {
        vendor: null,
        items: null,
    },
    entries: [],
    isLoading: true,
    profileId: null,
    status: null,
    user: null,
    users: null,
    orders: [],
}

const reducer = (state = initialState, action) => {
    let { cart, entries, isLoading, orders, profileId, status, user, users } = state

    switch(action.type) {
        case 'SET_LOADING':
            isLoading = action.loading
            break
        case 'SET_USER':
            user = action.user
            break
        case 'SET_PROFILE_IMAGE':
            user = { ...user, profileImage: action.image }
            break
        case 'SET_USERS':
            users = action.users
            break
        case 'SET_FEATURED_USER':
            profileId = action.id
            break
        case 'ADD_TO_CART':
            const { item, vendor } = action
            const items = cart.items || []
            cart = {
                vendor,
                items: [...items, item],
            }
        break
        case 'CLEAR_CART':
            cart = {
                vendor: null,
                items: null,
            }
        break
        case 'ADD_ORDER':
            orders = [...orders, action.order]
            cart = { vendor: null, items: null }
        break
        case 'REMOVE_ORDER':
            orders = orders.filter(order => order._id != action.id)
        break
        case 'NEW_ENTRY':
            entries = [ ...entries, action.entry ]
        break
        case 'SET_ENTRIES':
            entries = action.entries
        break
        case 'SET_STATUS':
            status = action.status
        break
        case 'SIGNOUT':
            cart = {
                vendorId: null,
                items: [],
            }
            user = null
            users = null
            entries = []
            profileId = null
            isLoading = false
            status = null
            orders = []
        break
        default:
            throw new Error('Not valid action type')
    }

    return { cart, entries, isLoading, orders, profileId, status, user, users }
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
            user: state.user,
            cart: state.cart,
            orders: state.orders,
        }}>
            {children}
        </AppContext.Provider>
    )
}