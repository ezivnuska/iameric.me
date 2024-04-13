import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    contacts: [],
    error: null,
    loading: false,
    setLoadingContacts: () => {},
    setContacts: () => {},
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
        setLoadingContacts: async payload => {
            dispatch({ type: 'SET_LOADING_CONTACTS', payload })
        },
        setContacts: async payload => {
            dispatch({ type: 'SET_USERS', payload })
        },
        updateContact: async payload => {
            dispatch({ type: 'UPDATE_USER', payload })
        },
        updateContactProducts: async payload => {
            dispatch({ type: 'UPDATE_USER_PRODUCTS', payload })
        },
        updateContactImages: async payload => {
            dispatch({ type: 'UPDATE_USER_IMAGES', payload })
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
        case 'SET_LOADING_CONTACTS':
            return { ...state, loading: payload }
            break
        case 'SET_USERS':
            return { ...state, contacts: payload }
            break
        case 'UPDATE_USER':
            return {
                ...state,
                contacts: state.contacts.map(
                    user => user._id === payload._id
                        ? payload
                        : user
                ),
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
        case 'UPDATE_USER_IMAGES':
            return {
                ...state,
                contacts: state.contacts.map(
                    user => user._id === payload.userId
                    ? ({ ...user, images: payload.images })
                    : user
                ),
            }
            break
        // NOT USED
        // case 'ADD_USER_IMAGE':
        //     return {
        //         ...state,
        //         contacts: state.contacts.map(
        //             user => user._id === action.image.user
        //             ? ({ ...user, images: [...user.images, action.image] })
        //             : user
        //         ),
        //     }
        //     break
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
        // NOT USED
        // case 'REMOVE_PRODUCT_FROM_SINGLE_USER':
        //     return {
        //         ...state,
        //         contacts: state.contacts.map(user => {
        //             if (user._id === action.product.user) {
        //                 return {
        //                     ...user,
        //                     products: user.products.filter(products => products._id !== action.product._id),
        //                 }
        //             }
        //             return user
        //         }),
        //     }
        //     break
        // NOT USED
        // case 'ADD_PRODUCT_TO_SINGLE_USER':
        //     return {
        //         ...state,
        //         contacts: state.contacts.map(user => {
        //             if (user._id === action.product.user) {
        //                 return {
        //                     ...user,
        //                     products: [...user.products, action.product],
        //                 }
        //             }
        //             return user
        //         }),
        //     }
        //     break
        // NOT USED
        // case 'UPDATE_USER_PRODUCT':
        //     return {
        //         ...state,
        //         contacts: state.contacts.map(user => {
        //             if (user._id === action.userId) {
        //                 return {
        //                     ...user,
        //                     products: user.products.map(p => p._id === action.product._id ? action.product : p),
        //                 }
        //             }
        //             return user
        //         }),
        //     }
        //     break
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