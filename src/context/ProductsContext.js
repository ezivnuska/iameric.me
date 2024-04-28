import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
// import { loadProducts } from '@utils/products'

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

export const ProductsContext = createContext(initialState)

export const useProducts = () => {
    const context = useContext(ProductsContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const ProductsContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const actions = useMemo(() => ({
        removeProductImage: payload => {
            dispatch({ type: 'REMOVE_PRODUCT_IMAGE', payload })
        },
        setProductsLoading: payload => {
            dispatch({ type: 'SET_PRODUCTS_LOADING', payload })
        },
        setProducts: payload => {
            dispatch({ type: 'SET_PRODUCTS', payload })
        },
        addProduct: payload => {
            dispatch({ type: 'ADD_PRODUCT', payload })
        },
        updateProduct: payload => {
            dispatch({ type: 'UPDATE_PRODUCT', payload })
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
        deleteProduct: payload => {
            dispatch({ type: 'DELETE_PRODUCT', payload })
        },
    }), [state, dispatch])

    return (
        <ProductsContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </ProductsContext.Provider>
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
                    {
                        ...state.products[i],
                        ...payload,
                    },
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