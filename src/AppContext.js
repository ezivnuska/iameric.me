import React, { createContext, useReducer } from 'react'

const initialState = {
    entries: [],
}

const reducer = (state = initialState, action) => {
    let { entries } = state

    switch(action.type) {
        case 'NEW_ENTRY':
            entries = [...entries, action.entry]
            break
        case 'SET_ENTRIES':
            entries = action.entries
            break
        default:
            throw new Error('Not valid action type')
    }

    return { entries }
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
            dispatch
        }}>
            {children}
        </AppContext.Provider>
    )
}