import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadPosts } from '@utils/feed'

const initialState = {
    posts: [],
    error: null,
    feedLoaded: false,
    feedLoading: false,
    addPost: () => {},
    deletePost: () => {},
    setPosts: () => {},
    setFeedLoading: () => {},
    updatePost: () => {},
}

export const FeedContext = createContext(initialState)

export const useFeed = () => {
    const context = useContext(FeedContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const FeedContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const loadFeed = async () => {

        dispatch({ type: 'SET_FEED_LOADING', payload: true })
        const payload = await loadPosts()
        dispatch({ type: 'SET_FEED_LOADING', payload: false })
        
        if (!payload) console.log('could not load posts')
        else dispatch({ type: 'SET_POSTS', payload })

        dispatch({ type: 'SET_FEED_LOADED' })
    }
    
    useEffect(() => {
        loadFeed()
    }, [])

    const actions = useMemo(() => ({
        addPost: async payload => {
            dispatch({ type: 'ADD_POST', payload })
        },
        deletePost: async payload => {
            dispatch({ type: 'DELETE_POST', payload })
        },
        setPosts: async payload => {
            dispatch({ type: 'SET_POSTS', payload })
        },
        setFeedLoading: async payload => {
            dispatch({ type: 'SET_FEED_LOADING', payload })
        },
        updatePost: async payload => {
            dispatch({ type: 'UPDATE_POST', payload })
        },
    }), [state, dispatch])

    return  (
        <FeedContext.Provider
            value={{
                ...state,
                ...actions,
            }}
        >
            {state.feedLoaded && props.children}
        </FeedContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [ payload, ...state.posts ],
            }
            break
        case 'SET_FEED_LOADED':
            return {
                ...state,
                feedLoaded: true,
            }
            break
        case 'SET_FEED_LOADING':
            return {
                ...state,
                feedLoading: payload,
            }
            break
        case 'SET_POSTS':
            return {
                ...state,
                posts: payload,
            }
            break
        case 'UPDATE_POST':
            const posts = state.posts.map(post => {
                if (post._id === payload._id) return payload
                else return post
            })
            return {
                ...state,
                posts,
            }
            break
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)}
            break
        default:
            throw new Error()
    }
}