import React, { createContext, useReducer } from 'react'

const initialState = {
    cart: {
        vendorId: null,
        items: []
    },
    entries: [],
    isLoading: false,
    profileId: null,
    status: null,
    user: null,
    users: null,
}

const reducer = (state = initialState, action) => {
    let { cart, entries, isLoading, profileId, status, user, users } = state

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
            const { items, vendorId } = cart
            cart = {
                vendorId: vendorId || action.item.vendorId,
                items: [...items, action.item],
            }
        break
        case 'CLEAR_CART':
            cart = {
                vendorId: null,
                items: [],
            }
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
            break
        default:
            throw new Error('Not valid action type')
    }

    return { cart, entries, isLoading, profileId, status, user, users }
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
        }}>
            {children}
        </AppContext.Provider>
    )
}