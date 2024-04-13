import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    products: [],
    error: null,
    loaded: false,
    productsLoading: false,
    removeProductImage: () => {},
    setLoadingProducts: () => {},
    setProducts: () => {},
    addProduct: () => {},
    updateProduct: () => {},
    updateProductImage: () => {},
    deleteProduct: () => {},
}

export const ProductContext = createContext(initialState)

export const useProducts = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const ProductContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const actions = useMemo(() => ({
        removeProductImage: imageId => {
            dispatch({ type: 'REMOVE_PRODUCT_IMAGE', payload: imageId })
        },
        setProductsLoading: payload => {
            dispatch({ type: 'SET_PRODUCTS_LOADING', payload })
        },
        setProducts: products => {
            dispatch({ type: 'SET_PRODUCTS', payload: products })
        },
        addProduct: product => {
            dispatch({ type: 'ADD_PRODUCT', payload: product })
        },
        updateProduct: product => {
            dispatch({ type: 'UPDATE_PRODUCT', payload: product })
        },
        updateProductImage: (productId, image) => {
            dispatch({
                type: 'UPDATE_PRODUCT_IMAGE',
                payload: {
                    image,
                    productId,
                },
            })
        },
        deleteProduct: productId => {
            dispatch({ type: 'DELETE_PRODUCT', payload: productId })
        },
    }), [state, dispatch])

    return (
        <ProductContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </ProductContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'SET_PRODUCTS_LOADING':
            return {
                ...state,
                loading: payload,
            }
            break
        case 'PRODUCTS_LOADED':
            return {
                ...state,
                loaded: payload,
            }
            break
        case 'REMOVE_PRODUCT_IMAGE':
            return {
                ...state,
                products: state.products.map(
                    product => (product.image && product.image._id === payload)
                        ? { ...prod, image: null }
                        : product
                ),
            }
            break
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: payload,
            }
            break
        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [ ...state.products, payload ],
            }
            break
        case 'UPDATE_PRODUCT':
            const i = state.products.findIndex(product => product._id === payload._id)
            if (i <= -1) return state
            return {
                ...state,
                products: [
                    ...state.products.slice(0, i),
                    payload,
                    ...state.products.slice(i + 1),
                ],
            }
            break
        case 'UPDATE_PRODUCT_IMAGE':
            return {
                ...state,
                products: state.products.map(
                    product => (product._id === payload.productId)
                    ? { ...product, image: payload.image }
                    : product
                ),
            }
            break
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(
                    product => product._id !== payload
                ),
            }
            break
        default:
            throw new Error()
    }
}