import React, { createContext, useReducer } from 'react'
import { useWindowDimensions } from 'react-native'

import {
    cartReducer,
    entriesReducer,
    loadingReducer,
    modalReducer,
    userReducer,
    usersReducer,
} from './reducers'

export const AppContext = createContext({})

const combineReducers = (reducers) => {  
    return (state = {}, action) => {
        const newState = {}
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action)
        }
        return newState
    }
}

const initialState = {
    cart: null,
    entries: null,
    feature: null,
    image: null,
    loading: null,
    modal: null,
    user: null,
    users: null,
}

export const AppProvider = ({ children, preferences }) => {
    
    const [state, dispatch] = useReducer(
        combineReducers({
            cart: cartReducer,
            entries: entriesReducer,
            loading: loadingReducer,
            modal: modalReducer,
            user: userReducer,
            users: usersReducer,
        }), initialState
    )
    
    const dims = useWindowDimensions()
    
    const {
        cart,
        entries,
        loading,
        modal,
        user,
        users,
    } = state

    return (
        <AppContext.Provider
            value={{
                dispatch,
                state,
                cart,
                entries,
                loading,
                modal,
                user,
                users,
                isLandscape: dims.width > dims.height,
                ...preferences,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}