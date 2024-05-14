import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    error: null,
    items: [],
    cartLoading: false,
    vendor: null,
    addToCart: () => {},
    clearCart: () => {},
    removeFromCart: () => {},
    removeOne: () => {},
    setCartLoading: () => {},
}

export const CartContext = createContext(initialState)

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const CartContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const actions = useMemo(() => ({
        addToCart: (product, quantity = 1) => {
            dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } })
        },
        clearCart: () => {
            dispatch({ type: 'CLEAR_CART' })
        },
        removeFromCart: payload => {
            dispatch({ type: 'REMOVE_FROM_CART', payload })
        },
        removeOne: payload => {
            dispatch({ type: 'REMOVE_ONE', payload})
        },
        setCartLoading: payload => {
            dispatch({ type: 'SET_CART_LOADING', payload })
        },
    }), [state, dispatch])

    return (
        <CartContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </CartContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'ADD_TO_CART':
            const { product, quantity } = payload
            
            let updatedItems = state.items
            const itemIndex = state.items.findIndex(item => item.product._id === product._id)
            
            if (itemIndex > -1) {
                const start = state.items.slice(0, itemIndex)
                const end = state.items.slice(itemIndex + 1)
                const item = state.items[itemIndex]
                
                const updatedItem = {
                    ...item,
                    quantity: item.quantity + quantity,
                }
                updatedItems = [
                    ...start,
                    updatedItem,
                    ...end,
                ]
            } else {
                updatedItems = [
                    ...state.items,
                    { product, quantity },
                ]
            }
            return {
                ...state,
                items: updatedItems,
                vendor: product.vendor,
            }
            
            break
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                vendor: null,
            }
            break
        case 'SET_CART_LOADING':
            return {
                ...state,
                cartLoading: payload,
            }
            break
        case 'REMOVE_FROM_CART':
            const indexToRemove = state.items.findIndex(item => item.product._id === payload)
            if (indexToRemove < 0) {
                return {
                    ...state,
                    error: 'Could not find item to remove.',
                }
            } else {
                const start = state.items.slice(0, indexToRemove)
                const end = state.items.slice(indexToRemove + 1)
                return {
                    ...state,
                    items: [...start, ...end],
                }
            }
            break
        case 'REMOVE_ONE':
            return {
                ...state,
                items: state.items.map(item => {
                    const { product, quantity } = item
                    if (product._id === payload) {
                        if (quantity > 1) {
                            return {
                                ...item,
                                quantity: quantity - 1,
                            }
                        }
                    }
                    return item
                }),
            }
            break
        default:
            throw new Error()
    }
}