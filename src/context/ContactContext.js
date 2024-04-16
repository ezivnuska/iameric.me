import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    lastContact: null,
    contact: null,
    contacts: [],
    error: null,
    contactsLoading: false,
    setContact: () => {},
    setContacts: () => {},
    setContactsLoading: () => {},
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

    const actions = useMemo(() => ({
        setContact: async payload => {
            // dispatch({ type: 'UPDATE_CONTACT', payload })
            dispatch({ type: 'SET_CONTACT', payload })
        },
        setContactsLoading: async payload => {
            dispatch({ type: 'SET_CONTACTS_LOADING', payload })
        },
        setContacts: async payload => {
            dispatch({ type: 'SET_CONTACTS', payload })
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
        case 'SET_CONTACTS':
            return { ...state, contacts: payload }
            break
        case 'SET_CONTACTS_LOADING':
            return { ...state, contactsLoading: payload }
            break
        case 'UPDATE_CONTACT':
            let contact = state.contact
            const contacts = state.contacts.length
                ? state.contacts.map(user => {
                    if (user._id === payload._id) {
                        contact = { ...user, ...payload }
                        return contact
                    }
                    return user
                }) : [payload]

            return {
                ...state,
                contact,
                contacts,
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