import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import {
    getItem,
    // removeToken,
    // setToken,
} from '@utils/storage'

const initialState = {
    error: null,
    formFields: {},
    formLoading: false,
    clearForm: () => {},
    clearFormError: () => {},
    initForm: () => {},
    setFormError: () => {},
    setFormLoading: () => {},
    setFormValues: () => {},
}

export const FormContext = createContext(initialState)

export const useForm = () => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const FormContextProvider = props => {

    const [state, dispatch ] = useReducer(reducer, initialState)
    
    useEffect(() => {
        const initState = async () => {
            try {
                // check for email in local storage
                const email = await getItem('email')
                // if email exists
                if (email) {
                    // set value in state
                    dispatch({ type: 'SET_FORM_VALUES', payload: { ...state.formFields, email } })
                }
            } catch (e) {
                console.log('Error:', e)
            }
        }
        initState()
    }, [])

    const actions = useMemo(() => ({
        clearForm: async () => {
            dispatch({ type: 'CLEAR_FORM' })
        },
        clearFormError: async () => {
            dispatch({ type: 'CLEAR_FORM_ERROR' })
        },
        initForm: async payload => {
            console.log('init form-->', payload)
            dispatch({ type: 'SET_FORM_VALUES', payload })
        },
        setFormError: async payload => {
            dispatch({ type: 'SET_FORM_ERROR', payload })
        },
        setFormLoading: async payload => {
            dispatch({ type: 'SET_FORM_LOADING', payload })
        },
        setFormValues: async payload => {
            dispatch({ type: 'SET_FORM_VALUES', payload })
        },
    }), [state, dispatch])
    
    return (
        <FormContext.Provider value={{ ...state, ...actions }}>
            {props.children}
        </FormContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'CLEAR_FORM':
            return {
                ...state,
                formFields: { email: state.formFields.email },
            }
            break
        case 'CLEAR_FORM_ERROR':
            if (!state.formError) return state
            return {
                ...state,
                formError: null,
            }
            break
        case 'INIT_FORM':
            return {
                ...state,
                formFields: {
                    ...state.formFields,
                    ...payload,
                },
            }
            break
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formError: payload,
            }
            break
        case 'SET_FORM_LOADING':
            return {
                ...state,
                formLoading: payload,
            }
            break
        case 'SET_FORM_VALUES':
            return {
                ...state,
                formFields: {
                    ...state.formFields,
                    ...payload,
                },
            }
            break
        default:
            throw new Error()
    }
}