import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useApp } from './AppContext'
import { loadUserOrders } from '@utils/orders'

const initialState = {
    error: null,
    orders: [],
    ordersLoaded: false,
    ordersLoading: false,
    setOrders: () => {},
    setOrdersLoading: () => {},
    addOrder: () => {},
    markOrderConfirmed: () => {},
    markOrderReady: () => {},
    markOrderAccepted: () => {},
    markDriverArrived: () => {},
    markOrderReceived: () => {},
    markOrderCompleted: () => {},
    closeOrder: () => {},
    removeOrder: () => {},
}

export const OrderContext = createContext(initialState)

export const useOrders = () => {
    const context = useContext(OrderContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const OrderContextProvider = props => {
    
    const { userId } = useApp()

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const initOrders = async () => {
            if (userId) {
                dispatch({type: 'SET_ORDERS_LOADING', payload: true })
                const payload = await loadUserOrders(userId)
                dispatch({type: 'SET_ORDERS_LOADING', payload: false })
                dispatch({type: 'SET_ORDERS', payload })
            }

            dispatch({type: 'SET_ORDERS_LOADED' })
        }
        
        if (!state.ordersLoading && !state.ordersLoaded) initOrders()
        // else if (!userId) dispatch({ type: 'RESET' })
    }, [userId])

    const actions = useMemo(() => ({
        addOrder: payload => {
            dispatch({ type: 'ADD_ORDER', payload })
        },
        setOrders: payload => {
            dispatch({ type: 'SET_ORDERS', payload })
        },
        setOrdersLoading: payload => {
            dispatch({ type: 'SET_ORDERS_LOADING', payload })
        },
        markOrderConfirmed: payload => {
            dispatch({ type: 'CONFIRM_ORDER', payload })
        },
        markOrderReady: payload => {
            dispatch({ type: 'ORDER_READY', payload })
        },
        markOrderAccepted: payload => {
            dispatch({ type: 'ACCEPT_ORDER', payload })
        },
        markDriverArrived: payload => {
            dispatch({ type: 'DRIVER_ARRIVED', payload })
        },
        markOrderReceived: payload => {
            dispatch({ type: 'ORDER_RECEIVED', payload })
        },
        markOrderCompleted: payload => {
            dispatch({ type: 'COMPLETE_ORDER', payload })
        },
        closeOrder: payload => {
            dispatch({ type: 'CLOSE_ORDER', payload })
        },
        removeOrder: payload => {
            dispatch({ type: 'REMOVE_ORDER', payload })
        },
    }), [state, dispatch])

    return (
        <OrderContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </OrderContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'SET_ORDERS':
            return {
                ...state,
                orders: payload,
            }
            break
        case 'SET_ORDERS_LOADED':
            return {
                ...state,
                ordersLoaded: true,
            }
            break
        case 'SET_ORDERS_LOADING':
            return {
                ...state,
                ordersLoading: payload,
            }
            break
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [ ...state.orders, payload ],
            }
            break
        case 'CONFIRM_ORDER':
            return {
                ...state,
                orders: state.orders.map(
                    order => order._id == payload._id
                    ? {
                        ...order,
                        status: payload.status,
                        confirmed: payload.confirmed,
                    } : order
                ),
            }
            break
        case 'ORDER_READY':
            return {
                ...state,
                orders: state.orders.map(
                    order => order._id == payload._id
                        ? {
                            ...order,
                            status: payload.status,
                            ready: payload.ready,
                        } : order
                ),
            }
            break
        case 'ACCEPT_ORDER':
            return {
                ...state,
                orders: state.orders.map(
                    order => order._id == payload._id
                        ? {
                            ...order,
                            status: payload.status,
                            accepted: payload.accepted,
                            driver: payload.driver,
                        } : order
                ),
            }
            break
        case 'DRIVER_ARRIVED':
            return {
                ...state,
                orders: state.orders.map(
                    order => order._id == payload._id
                        ? {
                            ...order,
                            status: payload.status,
                            arrived: payload.arrived,
                        } : order
                ),
            }
            break
        case 'ORDER_RECEIVED':
            return {
                ...state,
                orders: state.orders.map(
                    order => order._id == payload._id
                        ? {
                            ...order,
                            status: payload.status,
                            received: payload.recieved,
                        } : order
                ),
            }
        break
        case 'COMPLETE_ORDER':
            return {
                ...state,
                orders: state.orders.map(
                    order => order._id == payload._id
                        ? {
                            ...order,
                            status: payload.status,
                            delivered: payload.delivered,
                        } : order
                ),
            }
        break
        case 'CLOSE_ORDER':
            return {
                ...state,
                orders: state.orders.map(
                    order => order._id === payload._id
                        ? {
                            ...order,
                            status: payload.status,
                            closed: payload.closed,
                        } : order
                ),
            }
        break
        case 'REMOVE_ORDER':
            return {
                ...state,
                orders: state.orders.filter(order => order._id != payload)
            }
        break
        // case 'ADD_TO_CART':

        //     const { product, quantity } = action

        //     return {
        //         ...state,
        //         items: [
        //             ...state.items,
        //             { product, quantity },
        //         ],
        //         vendor: product.vendor,
        //     }
        //     break
        // case 'REMOVE_FROM_CART':

        //     const { productId } = action
        //     const indexToRemove = state.items.findIndex(item => item._id === productId)
        //     if (indexToRemove < 0) {
        //         return {
        //             ...state,
        //             error: 'Could not find item to remove.',
        //         }
        //     } else {
        //         const start = state.items.slice(0, itemIndex)
        //         const end = state.items.slice(itemIndex + 1)
        //         return {
        //             ...state,
        //             items: [...start, ...end],
        //         }
        //     }
        //     break
        // case 'CLEAR_CART':
        //     return {
        //         ...state,
        //         items: [],
        //         vendor: null,
        //     }
        //     break
        default:
            throw new Error()
    }
}