import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadContacts } from '@utils/contacts'
// import { useApp } from '@app'

const initialState = {
    contacts: [],
    contactsLoaded: false,
    contactLoading: false,
    contactsLoading: false,
    addContact: () => {},
    removeContact: () => {},
    setContacts: () => {},
    setContactsLoaded: () => {},
    setContactsLoading: () => {},
    updateContact: () => {},
}

export const ContactsContext = createContext(initialState)

export const useContacts = () => {
    const context = useContext(ContactsContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const ContactsContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const initLoading = async () => {
        dispatch({ type: 'SET_CONTACTS_LOADING', payload: true })
        const users = await loadContacts()
        dispatch({ type: 'SET_CONTACTS_LOADING', payload: false })

        if (!users) console.log('could not load contacts')
        else dispatch({ type: 'SET_CONTACTS', payload: users })
        
        dispatch({ type: 'SET_CONTACTS_LOADED' })
    }

    useEffect(() => {

        
        
        // init()

    }, [])

    const getContact = payload => state.contacts.filter(contact => contact.username === payload)[0]

    const actions = useMemo(() => ({
        addContact: async payload => {
            dispatch({ type: 'ADD_CONTACT', payload })
        },
        removeContact: async payload => {
            dispatch({ type: 'REMOVE_CONTACT', payload })
        },
        setContacts: async payload => {
            dispatch({ type: 'SET_CONTACTS', payload })
        },
        setContactsLoaded: async () => {
            dispatch({ type: 'SET_CONTACTS_LOADED' })
        },
        setContactsLoading: async payload => {
            dispatch({ type: 'SET_CONTACTS_LOADING', payload })
        },
        updateContact: async payload => {
            dispatch({ type: 'UPDATE_CONTACT', payload })
        },
    }), [state, dispatch])

    return (
        <ContactsContext.Provider
            value={{
                ...state,
                ...actions,
                getContact,
                initLoading,
            }}
        >
            {props.children}
        </ContactsContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts, payload],
            }
            break
        case 'REMOVE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== payload),
            }
            break
        case 'SET_CONTACTS':
            return { ...state, contacts: payload }
            break
        case 'SET_CONTACTS_LOADED':
            return { ...state, contactsLoaded: true }
            break
        case 'SET_CONTACTS_LOADING':
            return { ...state, contactsLoading: payload }
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