import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadContacts } from '@utils/contacts'
import { useApp } from '@context'

const initialState = {
    lastContact: null,
    contact: null,
    contacts: [],
    contactsLoaded: false,
    contactLoading: false,
    contactsLoading: false,
    contactModals: [],
    error: null,
    closeContactModal: () => {},
    setContact: () => {},
    setContacts: () => {},
    setContactLoading: () => {},
    setContactsLoading: () => {},
    setContactModal: () => {},
    updateContact: () => {},
    updateContactProducts: () => {},
    updateContactImages: () => {},
}

export const ContactContext = createContext(initialState)

export const useContacts = () => {
    const context = useContext(ContactContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const ContactContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const { userId } = useApp()

    useEffect(() => {
        const init = async () => {
            dispatch({ type: 'SET_CONTACTS_LOADING', payload: true })
            const data = await loadContacts()
            dispatch({ type: 'SET_CONTACTS_LOADING', payload: false })
            if (!data) console.log('could not load contacts')
            else dispatch({ type: 'SET_CONTACTS', payload: data })
            
            dispatch({ type: 'SET_CONTACTS_LOADED' })
        }
        
        if (!state.contactsLoaded) init()

    }, [userId])

    const actions = useMemo(() => ({
        closeContactModal: async () => {
            dispatch({ type: 'CLOSE_CONTACT_MODAL' })
        },
        setContact: async payload => {
            dispatch({ type: 'SET_CONTACT', payload })
        },
        setContactLoading: async payload => {
            dispatch({ type: 'SET_CONTACT_LOADING', payload })
        },
        setContacts: async payload => {
            dispatch({ type: 'SET_CONTACTS', payload })
        },
        setContactsLoading: async payload => {
            dispatch({ type: 'SET_CONTACTS_LOADING', payload })
        },
        setContactModal: async (type, data) => {
            dispatch({
                type: 'SET_CONTACT_MODAL',
                payload: { data, type },
            })
        },
        updateContact: async payload => {
            dispatch({ type: 'UPDATE_CONTACT', payload })
        },
        updateContactImages: async payload => {
            dispatch({ type: 'UPDATE_CONTACT_IMAGES', payload })
        },
        updateContactProducts: async payload => {
            dispatch({ type: 'UPDATE_USER_PRODUCTS', payload })
        },
    }), [state, dispatch])

    return (
        <ContactContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </ContactContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'SET_CONTACT':
            return {
                ...state,
                contact: payload,
                lastContact: state.contact,
            }
            break
        case 'SET_CONTACT_LOADING':
            return { ...state, contactLoading: payload }
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
        case 'SET_CONTACT_MODAL':
            if (!payload) return state
            return {
                ...state,
                contactModals: [
                    ...state.contactModals,
                    payload,
                ],
            }
            break
        case 'CLOSE_CONTACT_MODAL':
            return {
                ...state,
                contactModals: state.contactModals.slice(0, state.contactModals.length - 1),
                contact: null,
            }
            break
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.length
                    ? state.contacts.map(user => {
                        if (user._id === payload._id) {
                            return { ...user, ...payload }
                        }
                        return user
                    })
                    : [payload]
            }
            break
        case 'UPDATE_USER_PRODUCTS':
            return {
                ...state,
                contacts: state.contacts.map(
                    user._id === payload.userId
                        ? ({ ...user, products: payload.products })
                        : user
                ),
            }
            break
        case 'UPDATE_CONTACT_IMAGES':
            return {
                ...state,
                contacts: state.contacts.map(
                    user => user._id === payload.userId
                    ? ({ ...user, images: payload.images })
                    : user
                ),
            }
            break
        case 'UPDATE_USER_IMAGE':
            
            return {
                ...state,
                contacts: state.contacts.map(user => {
                    if (user._id === payload.userId) {

                        if (!user.images) return {
                            ...state,
                            images: [action.image],
                        }

                        return {
                            ...user,
                            images: user.images.map(
                                img => img._id === payload
                                    ? payload
                                    : img
                            ),
                        }
                    }
                    return user
                }),
            }
            break
        case 'REMOVE_USER_IMAGE':
            return {
                ...state,
                contacts: state.contacts.map(user => {
                    if (user._id === payload.user) {
                        return {
                            ...user,
                            images: user.images.filter(
                                image => image._id !== payload._id
                            ),
                        }
                    }
                    return user
                }),
            }
            break
        case 'UPDATE_USERS_LOCATION':
            return {
                ...state,
                contacts: state.contacts.map(user => {
                    if (user._id === payload.userId) {
                        return {
                            ...user,
                            location: payload.location,
                        }
                    }
                    return user
                }),
            }
            break
        case 'UPDATE_USERS_LOCATION_WITH_LOCATION_ID':
            return {
                ...state,
                contacts: state.contacts.map(user => {
                    if (user._id === payload.userId) {
                        return {
                            ...user,
                            location: payload,
                        }
                    }
                    return user
                }),
            }
            break
        default:
            throw new Error()
    }
}