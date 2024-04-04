import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    error: null,
    items: [],
    loaded: false,
    loading: false,
    vendor: null,
    addToCart: () => {},
    clearCart: () => {},
    removeCart: () => {},
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
        addToCart: (product, quantity) => {
            dispatch({
                type: 'ADD_TO_CART',
                payload: {
                    product,
                    quantity,
                },
            })
        },
        removeFromCart: productId => {
            dispatch({
                type: 'REMOVE_FROM_CART',
                payload: productId,
            })
        },
        clearCart: () => {
            dispatch({ type: 'CLEAR_CART' })
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
            return {
                ...state,
                items: [
                    ...state.items,
                    { product, quantity },
                ],
                vendor: product.vendor,
            }
            break
        case 'REMOVE_FROM_CART':
            const indexToRemove = state.items.findIndex(item => item._id === payload)
            if (indexToRemove < 0) {
                return {
                    ...state,
                    error: 'Could not find item to remove.',
                }
            } else {
                const start = state.items.slice(0, itemIndex)
                const end = state.items.slice(itemIndex + 1)
                return {
                    ...state,
                    items: [...start, ...end],
                }
            }
            break
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                vendor: null,
            }
            break
        default:
            throw new Error()
    }
}