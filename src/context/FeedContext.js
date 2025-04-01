import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    modals: [],
    posts: [],
    error: null,
    feedLoaded: false,
    feedLoading: false,
    addComment: () => {},
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
        addComment: async payload => dispatch({ type: 'ADD_COMMENT', payload }),
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
            return {
                ...state,
                posts: state.posts.map((post, i) => post._id === payload._id ? payload : post),
            }
            break
        case 'ADD_COMMENT':
            return {
                ...state,
                posts: state.posts.map((post, i) => post._id === payload.threadId
                    ? {
                        ...post,
                        comments: [...post.comments, payload]
                    } : post),
            }
            break
        case 'DELETE_POST':
            let posts
            
            if (payload.threadId) {
                posts = state.posts.map(post => post._id === payload.threadId
                    ? {
                        ...post,
                        comments: post.comments.filter(comment => comment._id !== payload._id),
                    }
                    : post
                )
            } else {
                posts = state.posts.filter(post => post._id !== payload._id)
            }
            
            return {
                ...state,
                posts,
            }
            break
        default:
            throw new Error()
    }
}