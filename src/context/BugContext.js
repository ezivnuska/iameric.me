import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadEntries } from '@utils/bugs'

const initialState = {
    bugs: [],
    error: null,
    bugsLoaded: false,
    bugsLoading: false,
    addBug: () => {},
    deleteBug: () => {},
    initBugs: () => {},
    setBugs: () => {},
    setBugsLoading: () => {},
    updateBug: () => {},
}

export const BugContext = createContext(initialState)

export const useBugs = () => {
    const context = useContext(BugContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const BugContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const initBugs = async () => {
        dispatch({ type: 'SET_BUGS_LOADING', payload: true })
        const payload = await loadEntries()
        dispatch({ type: 'SET_BUGS_LOADING', payload: false })
        
        if (!payload) console.log('could not load bugs')
        else dispatch({ type: 'SET_BUGS', payload })

        dispatch({ type: 'SET_BUGS_LOADED' })
    }

    const actions = useMemo(() => ({
        initBugs,
        addBug: payload => {
            dispatch({ type: 'ADD_BUG', payload })
        },
        deleteBug: payload => {
            dispatch({ type: 'DELETE_BUG', payload })
        },
        setBugs: payload => {
            dispatch({ type: 'SET_BUGS', payload })
        },
        setBugsLoading: payload => {
            dispatch({ type: 'SET_BUGS_LOADING', payload })
        },
        updateBug: payload => {
            dispatch({ type: 'UPDATE_BUG', payload })
        },
    }), [state, dispatch])

    return  (
        <BugContext.Provider value={{ ...state, ...actions }}>
            {children}
        </BugContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'ADD_BUG':
            return {
                ...state,
                bugs: [ payload, ...state.bugs ],
            }
            break
        case 'SET_BUGS_LOADED':
            return {
                ...state,
                bugsLoaded: true,
            }
            break
        case 'SET_BUGS_LOADING':
            return {
                ...state,
                bugsLoading: payload,
            }
            break
        case 'SET_BUGS':
            return {
                ...state,
                bugs: payload,
            }
            break
        case 'UPDATE_BUG':
            let bugExists = false
            const bugs = state.bugs.map(bug => {
                if (bug._id === payload._id) {
                    bugExists = true
                    return payload
                }
                else return bug
            })
            return {
                ...state,
                bugs: bugExists ? bugs : [payload, ...state.bugs],
            }
            break
        case 'DELETE_BUG':
            return {
                ...state,
                bugs: state.bugs.filter(bug => bug._id !== payload)}
            break
        default:
            throw new Error()
    }
}