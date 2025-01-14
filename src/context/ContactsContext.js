import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { loadContact, loadContacts } from '@utils/contacts'
import { loadImages } from '@utils/images'

const initialState = {
    contact: null,
    contacts: [],
    contactLoaded: false,
    contactLoading: false,
    contactImagesLoaded: false,
    contactImagesLoading: false,
    contactsLoaded: false,
    contactLoading: false,
    contactsLoading: false,
    addContact: () => {},
    removeContact: () => {},
    setContact: () => {},
    setContactLoading: () => {},
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

    const initContacts = async () => {
        console.log('initContacts')
        dispatch({ type: 'SET_CONTACTS_LOADING', payload: true })
        const users = await loadContacts()
        dispatch({ type: 'SET_CONTACTS_LOADING', payload: false })

        if (!users) console.log('could not load contacts')
        else dispatch({ type: 'SET_CONTACTS', payload: users })
        
        dispatch({ type: 'SET_CONTACTS_LOADED' })
    }

    const initContact = async username => {

        dispatch({ type: 'SET_CONTACT_LOADING', payload: true })
        const user = await loadContact(username, true)
        dispatch({ type: 'SET_CONTACT_LOADING', payload: false })
        
        if (!user) console.log('could not load contact')
        else {
            dispatch({ type: 'SET_CONTACT', payload: user })
            dispatch({ type: 'UPDATE_CONTACT', payload: user })
        }
        dispatch({ type: 'SET_CONTACT_LOADED' })
        dispatch({ type: 'SET_CONTACT_IMAGES_LOADED' })
    }

    const getContact = username => state.contacts.filter(contact => contact.username === username)[0]
    
    const getContactImage = (username, imageId) => {
        const user = state.contacts.filter(contact => contact.username === username)[0]
        const image = user?.images?.length ? user.images.filter(image => image._id === imageId)[0] : null
        return image
    }

    const actions = useMemo(() => ({
        getContact,
        getContactImage,
        initContact,
        initContacts,
        addContact: async payload => {
            dispatch({ type: 'ADD_CONTACT', payload })
        },
        removeContact: async payload => {
            dispatch({ type: 'REMOVE_CONTACT', payload })
        },
        setContactLoading: async payload => {
            dispatch({ type: 'SET_CONTACT_LOADING', payload })
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
                    : [payload],
            }
            break
        case 'UPDATE_CONTACT_IMAGES':
            return {
                ...state,
                contacts: state.contacts.length
                    ? state.contacts.map(contact => contact._id === payload._id ? ({ ...contact, images: payload.images }) : contact)
                    : [payload],
            }
            break
        case 'SET_CONTACT':
            return { ...state, contact: payload }
            break
        case 'SET_CONTACT_LOADED':
            return { ...state, contactLoaded: true }
            break
        case 'SET_CONTACT_LOADING':
            return { ...state, contactLoading: payload }
            break
        case 'SET_CONTACT_IMAGES_LOADING':
            return {
                ...state,
                contactImagesLoading: payload,
            }
            break
        case 'SET_CONTACT_IMAGES_LOADED':
            return {
                ...state,
                contactImagesLoaded: true,
            }
            break
        default:
            throw new Error()
    }
}