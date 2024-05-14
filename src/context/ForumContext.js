import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useApp } from '@context'
import { loadEntries } from '@utils/forum'

const initialState = {
    entries: [],
    error: null,
    forumLoaded: false,
    forumLoading: false,
    forumModals: [],
    addEntry: () => {},
    closeForumModal: () => {},
    deleteEntry: () => {},
    setEntries: () => {},
    setForumLoading: () => {},
    setForumModal: () => {},
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
    
    const { userId } = useApp()
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const initForum = async () => {
            if (userId) {
                dispatch({ type: 'SET_FORUM_LOADING', payload: true })
                const entries = await loadEntries()
                dispatch({ type: 'SET_FORUM_LOADING', payload: false })

                if (!entries) console.log('could not load entries')
                else dispatch({ type: 'SET_ENTRIES', payload: entries })
            }

            dispatch({ type: 'SET_FORUM_LOADED' })
        }
        
        if (!state.forumLoaded) initForum()
        // else if (!userId) dispatch({ type: 'RESET' })
    }, [userId])

    const actions = useMemo(() => ({
        addEntry: async payload => {
            dispatch({ type: 'ADD_ENTRY', payload })
        },
        closeForumModal: async () => {
            dispatch({ type: 'CLOSE_FORUM_MODAL' })
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
        setForumModal: async (type, data) => {
            dispatch({
                type: 'SET_FORUM_MODAL',
                payload: { data, type },
            })
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
        case 'SET_FORUM_MODAL':
            if (!payload) return state
            return {
                ...state,
                forumModals: [
                    ...state.forumModals,
                    payload,
                ],
            }
            break
        case 'CLOSE_FORUM_MODAL':
            return {
                ...state,
                forumModals: state.forumModals.slice(0, state.forumModals.length - 1),
            }
            break
        case 'SET_ENTRIES':
            return {
                ...state,
                entries: payload,
            }
            break
        case 'ADD_ENTRY':
            return {
                ...state,
                entries: [ payload, ...state.entries ],
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
        // case 'RESET':
        //     return {
        //         ...state,
        //         entries: [],
        //         forumLoaded: false,
        //     }
        //     break
            default:
            throw new Error()
    }
}