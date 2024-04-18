import React, { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
    modals: [],
    data: null,
    error: null,
    loaded: false,
    loading: false,
    type: null,
    setModal: () => {},
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
        closeModal: () => {
            if (state.modals.length > 1) dispatch({ type: 'SET_CONTACT', data: null })
            dispatch({ type: 'CLOSE_MODAL' })
        },
    }), [state, dispatch])

    return (
        <ModalContext.Provider value={{ ...state, ...actions }}>
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
        case 'CLOSE_MODAL':
            return {
                ...state,
                type: null,
                data: null,
                modals: state.modals.slice(0, state.modals.length - 1),
            }
            break
        default:
            throw new Error()
    }
}