import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    modals: [],
    posts: [],
    error: null,
    feedLoaded: false,
    feedLoading: false,
    addPost: () => {},
    closeFeedModal: () => {},
    deletePost: () => {},
    getPost: () => {},
    initFeed: () => {},
    setFeedLoading: () => {},
    setFeedModal: () => {},
    setPosts: () => {},
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

    const actions = useMemo(() => ({
        addPost: async payload => dispatch({ type: 'ADD_POST', payload }),
        deletePost: async payload => dispatch({ type: 'DELETE_POST', payload }),
        getPost: postId => state.posts.filter(post => post._id === postId)[0],
        setPosts: async payload => dispatch({ type: 'SET_POSTS', payload }),
        setFeedLoading: async payload => dispatch({ type: 'SET_FEED_LOADING', payload }),
        updatePost: async payload => dispatch({ type: 'UPDATE_POST', payload }),
        setFeedModal: (type, data) => dispatch({ type: 'SET_FEED_MODAL', payload: { data, type }}),
        closeFeedModal: () => dispatch({ type: 'CLOSE_FEED_MODAL' }),
    }), [state, dispatch])

    return  (
        <FeedContext.Provider value={{ ...state, ...actions }}>
            {props.children}
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
        case 'SET_FEED_MODAL':
            return {
                ...state,
                modals: [...state.modals, payload],
            }
            break
        case 'CLOSE_FEED_MODAL':
            return {
                ...state,
                modals: state.modals.slice(0, state.modals.length - 1),
            }
            break
        case 'SET_POSTS':
            return {
                ...state,
                posts: payload,
            }
            break
        case 'UPDATE_POST':
            let newPost = true
            const posts = state.posts.map((post, i) => {
                if (post._id === payload._id) {
                    newPost = false
                    return payload
                } else return post
            })
            return {
                ...state,
                posts: newPost ? [payload, ...state.posts] : posts,
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