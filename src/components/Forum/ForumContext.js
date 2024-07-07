import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useApp } from '@app'
import { loadEntries } from '@utils/forum'

const initialState = {
    entries: [],
    error: null,
    forumLoaded: false,
    forumLoading: false,
    addEntry: () => {},
    deleteEntry: () => {},
    setEntries: () => {},
    setForumLoading: () => {},
    updateEntry: () => {},
}

export const ForumContext = createContext(initialState)

export const useForum = () => {
    const context = useContext(ForumContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const ForumContextProvider = props => {
    
    const { user } = useApp()
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const initForum = async () => {
            
            if (user) {
                dispatch({ type: 'SET_FORUM_LOADING', payload: true })
                const entries = await loadEntries()
                dispatch({ type: 'SET_FORUM_LOADING', payload: false })
                
                if (!entries) console.log('could not load entries')
                else dispatch({ type: 'SET_ENTRIES', payload: entries })
            }
            
            dispatch({ type: 'SET_FORUM_LOADED' })
        }
        
        if (!state.forumLoaded) initForum()
    }, [user])

    const actions = useMemo(() => ({
        addEntry: async payload => {
            dispatch({ type: 'ADD_ENTRY', payload })
        },
        deleteEntry: async payload => {
            dispatch({ type: 'DELETE_ENTRY', payload })
        },
        setEntries: async payload => {
            dispatch({ type: 'SET_ENTRIES', payload })
        },
        setForumLoading: async payload => {
            dispatch({ type: 'SET_FORUM_LOADING', payload })
        },
        updateEntry: async payload => {
            dispatch({ type: 'UPDATE_ENTRY', payload })
        },
    }), [state, dispatch])

    return  (
        <ForumContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </ForumContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'ADD_ENTRY':
            return {
                ...state,
                entries: [ payload, ...state.entries ],
            }
            break
        case 'SET_FORUM_LOADED':
            return {
                ...state,
                forumLoaded: true,
            }
            break
        case 'SET_FORUM_LOADING':
            return {
                ...state,
                forumLoading: payload,
            }
            break
        case 'SET_ENTRIES':
            return {
                ...state,
                entries: payload,
            }
            break
        case 'UPDATE_ENTRY':
            const entries = state.entries.map((entry) => {
                if (entry._id === payload._id) return payload
                else return entry
            })
            return {
                ...state,
                entries,
            }
            break
        case 'DELETE_ENTRY':
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== payload)}
            break
        default:
            throw new Error()
    }
}