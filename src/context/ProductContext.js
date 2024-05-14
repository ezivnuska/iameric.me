import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useApp } from '@context'
import { loadProducts } from '@utils/products'

const initialState = {
    products: [],
    error: null,
    productsLoaded: false,
    productsLoading: false,
    productModals: [],
    closeProductModal: () => {},
    removeProductImage: () => {},
    setLoadingProducts: () => {},
    setProducts: () => {},
    setProductModal: () => {},
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
    
    const { userId } = useApp()
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const initProducts = async () => {
            if (userId) {
                dispatch({type: 'SET_PRODUCTS_LOADING', payload: true })
                const items = await loadProducts(userId)
                dispatch({type: 'SET_PRODUCTS_LOADING', payload: false })
                if (items) dispatch({type: 'SET_PRODUCTS', payload: items })
            }

            dispatch({type: 'SET_PRODUCTS_LOADED' })
        }
        
        if (!state.productsLoaded) initProducts()
        // else if (!userId) dispatch({ type: 'RESET' })
    }, [userId])

    const actions = useMemo(() => ({
        closeProductModal: () => {
            dispatch({ type: 'CLOSE_PRODUCT_MODAL' })
        },
        removeProductImage: payload => {
            dispatch({ type: 'REMOVE_PRODUCT_IMAGE', payload })
        },
        setProductsLoading: payload => {
            dispatch({ type: 'SET_PRODUCTS_LOADING', payload })
        },
        setProductModal: (type, data) => {
            dispatch({
                type: 'SET_PRODUCT_MODAL',
                payload: { data, type },
            })
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
        case 'SET_PRODUCTS_LOADED':
            return {
                ...state,
                productsLoaded: true,
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
        case 'SET_PRODUCT_MODAL':
            if (!payload) return state
            return {
                ...state,
                productModals: [
                    ...state.productModals,
                    payload,
                ],
            }
            break
        case 'CLOSE_PRODUCT_MODAL':
            return {
                ...state,
                productModals: state.productModals.slice(0, state.productModals.length - 1),
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
            if (i < 0) return state
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
            const { image, productId } = payload
            return {
                ...state,
                products: state.products.map(
                    product => {
                        return (product._id === productId)
                            ? { ...product, image }
                            : product
                    }
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
        // case 'RESET':
        //     return {
        //         ...state,
        //         products: [],
        //         productsLoaded: false,
        //     }
        default:
            throw new Error()
    }
}