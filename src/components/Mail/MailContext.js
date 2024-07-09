import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadMessages } from '@utils/mail'
import { useApp } from '@app'

const initialState = {
    messages: [],
    error: null,
    mailLoaded: false,
    mailLoading: false,
    addMessage: () => {},
    deleteMessage: () => {},
    setMessages: () => {},
    setMailLoading: () => {},
    updateMessage: () => {},
}

export const MailContext = createContext(initialState)

export const useMail = () => {
    const context = useContext(MailContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const MailContextProvider = props => {

    const { user } = useApp()
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const loadMail = async () => {
        dispatch({ type: 'SET_MAIL_LOADING', payload: true })
        const messages = await loadMessages(user._id)
        dispatch({ type: 'SET_MAIL_LOADING', payload: false })
        
        if (!messages) console.log('could not load messages')
        else dispatch({ type: 'SET_MESSAGES', payload: messages })

        dispatch({ type: 'SET_MAIL_LOADED' })
    }

    useEffect(() => {
        if (user) loadMail()
    }, [])

    const actions = useMemo(() => ({
        addMessage: async payload => {
            dispatch({ type: 'ADD_MESSAGE', payload })
        },
        deleteMessage: async payload => {
            dispatch({ type: 'DELETE_MESSAGE', payload })
        },
        setMessages: async payload => {
            dispatch({ type: 'SET_MESSAGES', payload })
        },
        setMailLoading: async payload => {
            dispatch({ type: 'SET_MAIL_LOADING', payload })
        },
        updateMessage: async payload => {
            dispatch({ type: 'UPDATE_MESSAGE', payload })
        },
    }), [state, dispatch])

    return  (
        <MailContext.Provider value={{ ...state, ...actions }}>
            {state.mailLoaded && props.children}
        </MailContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    let messages
    switch(type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [ payload, ...state.messages ],
            }
            break
        case 'SET_MAIL_LOADED':
            return { ...state, mailLoaded: true }
            break
        case 'SET_MAIL_LOADING':
            return { ...state, mailLoading: payload }
            break
        case 'SET_MESSAGES':
            return { ...state, messages: payload }
            break
        case 'UPDATE_MESSAGE':
            messages = state.messages.map(message => {
                if (message._id === payload._id) return payload
                else return message
            })
            return { ...state, messages }
            break
        case 'DELETE_MESSAGE':
            messages = state.messages.filter(message => message._id !== payload._id)
            return { ...state, messages }
            break
        default:
            throw new Error()
    }
}