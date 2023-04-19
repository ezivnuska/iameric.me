import React, { createContext, useReducer } from 'react'

const initialState = {
    user: null,
    users: null,
    profileId: null,
    isLoading: false,
    entries: [],
}

const reducer = (state = initialState, action) => {
    let { entries, isLoading, profileId, user, users } = state

    switch(action.type) {
        case 'SET_LOADING':
            isLoading = action.loading
            break
        case 'SET_USER':
            user = action.user
            break
        case 'SET_USERS':
            users = action.users
            break
        case 'SET_FEATURED_USER':
            profileId = action.id
            break
        case 'NEW_ENTRY':
            entries = [...entries, action.entry]
            break
        case 'ENTRY_DELETE':
            entries = entries.filter(entry => entry._id !== action.entryId)
            break
        case 'SET_ENTRIES':
            entries = action.entries
            break
        case 'SIGNOUT':
            user = null
            users = null
            entries = []
            profileId = null
            isLoading = false
            break
        default:
            throw new Error('Not valid action type')
    }

    return { entries, isLoading, profileId, user, users }
}

export const AppContext = createContext({
    state: initialState,
    dispatch: null,
})

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}