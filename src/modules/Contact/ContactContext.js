import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadContact } from '@utils/contacts'
// import { useApp } from '@app'

const initialState = {
    contact: null,
    contactModals: [],
    contactLoaded: false,
    contactLoading: false,
    clearContactModals: () => {},
    closeContactModal: () => {},
    setContact: () => {},
    setContactModal: () => {},
    setContactLoading: () => {},
    updateContact: () => {},
}

export const ContactContext = createContext(initialState)

export const useContact = () => {
    const context = useContext(ContactContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const ContactContextProvider = ({ username, ...props }) => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const initContact = async () => {
        dispatch({ type: 'SET_CONTACT_LOADING', payload: true })
        const user = await loadContact(username)
        dispatch({ type: 'SET_CONTACT_LOADING', payload: false })
        
        if (!user) console.log('could not load contact')
        else dispatch({ type: 'SET_CONTACT', payload: user })

        dispatch({ type: 'SET_CONTACT_LOADED' })
    }

    useEffect(() => {

        initContact()

    }, [])

    useEffect(() => {

        if (state.contact && state.contact.username !== username) {
            dispatch({ type: 'SET_CONTACT', payload: null })
            initContact()
        }

    }, [username])

    const actions = useMemo(() => ({
        clearContactModals: () => {
            dispatch({ type: 'CLEAR_CONTACT_MODALS' })
        },
        closeContactModal: () => {
            dispatch({ type: 'CLOSE_CONTACT_MODAL' })
        },
        setContactModal: (type, data) => {
            dispatch({ type: 'SET_CONTACT_MODAL', payload: { type, data } })
        },
        setContactLoading: async payload => {
            dispatch({ type: 'SET_CONTACT_LOADING', payload })
        },
        updateContact: async payload => {
            dispatch({ type: 'UPDATE_CONTACT', payload })
        },
    }), [state, dispatch])

    return (
        <ContactContext.Provider
            value={{
                ...state,
                ...actions,
                contactModal: state.contactModals[state.contactModals.length - 1],
            }}
        >
            {state.contactLoaded && props.children}
        </ContactContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'CLEAR_CONTACT_MODALS':
            return {
                ...state,
                contactModals: [],
            }
            break
        case 'CLOSE_CONTACT_MODAL':
            return {
                ...state,
                contactModals:  state.contactModals.slice(0, state.contactModals.length - 1),
            }
            break
        case 'SET_CONTACT':
            return { ...state, contact: payload }
            break
        case 'SET_CONTACT_MODAL':
            return {
                ...state,
                contactModals: [ ...state.contactModals, payload ],
            }
            break
        case 'SET_CONTACT_LOADED':
            return { ...state, contactLoaded: true }
            break
        case 'SET_CONTACT_LOADING':
            return { ...state, contactLoading: payload }
            break
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.length
                    ? state.contacts.map(contact => {
                        if (contact._id === payload._id) {
                            return { ...contact, ...payload }
                        }
                        return contact
                    })
                    : [payload]
            }
            break
        default:
            throw new Error()
    }
}