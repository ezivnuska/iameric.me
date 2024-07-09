import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    modals: [],
    data: null,
    error: null,
    loaded: false,
    loading: false,
    type: null,
    setModal: () => {},
    setNewModal: () => {},
    clearModal: () => {},
    closeModal: () => {},
}

export const ModalContext = createContext(initialState)

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const ModalContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const actions = useMemo(() => ({
        setModal: (type, data) => {
            dispatch({
                type: 'SET_MODAL',
                payload: { data, type },
            })
        },
        setNewModal: (type, data) => {
            dispatch({
                type: 'SET_NEW_MODAL',
                payload: { data, type },
            })
        },
        clearModal: () => {
            dispatch({ type: 'CLEAR_MODAL' })
        },
        closeModal: () => {
            dispatch({ type: 'CLOSE_MODAL' })
        },
    }), [state, dispatch])

    return (
        <ModalContext.Provider
            value={{
                ...state,
                modal: state.modals[state.modals.length - 1],
                ...actions,
                }}>
            {props.children}
        </ModalContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'SET_MODAL':
            return {
                ...state,
                type: payload?.type,
                data: payload?.data,
                modals: [
                    ...state.modals,
                    payload,
                ],
            }
            break
        case 'SET_NEW_MODAL':
            return {
                ...state,
                type: payload?.type,
                data: payload?.data,
                modals: [payload],
            }
            break
        case 'CLOSE_MODAL':
            return {
                ...state,
                type: null,
                data: null,
                modals: state.modals.slice(0, state.modals.length - 1),
            }
            break
        case 'CLEAR_MODAL':
            return {
                ...state,
                type: null,
                data: null,
                modals: [],
            }
            break
        default:
            throw new Error()
    }
}