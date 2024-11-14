import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { getItem } from '@utils/storage'

const initialState = {
    formError: null,
    dirtyFields: [],
    focused: null,
    formFields: {},
    formLoading: false,
    formReady: false,
    clearForm: () => {},
    clearFormError: () => {},
    getDirty: () => {},
    getError: () => {},
    getFocus: () => {},
    initForm: () => {},
    markDirty: () => {},
    resetForm: () => {},
    setFocus: () => {},
    setFormError: () => {},
    setFormLoading: () => {},
    setFormReady: () => {},
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
            dispatch({ type: 'SET_FORM_LOADED' })
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
        getDirty: payload => {
            return state.dirtyFields.indexOf(payload) > -1
        },
        getError: payload => {
            if (state.formError && state.formError.name === payload) {
                return state.formError.message
            }
            return false
        },
        getFocus: payload => state.focused === payload,
        initForm: payload => {
            const fields = {
                ...payload,
                ...state.formFields,
            }
            console.log('init form', fields)
            dispatch({
                type: 'INIT_FORM',
                payload: fields,
            })
        },
        markDirty: async payload => {
            dispatch({ type: 'MARK_DIRTY', payload })
        },
        resetForm: () => {
            // console.log('RESETTING FORM')
            dispatch({ type: 'RESET_FORM' })
        },
        setFocus: async payload => {
            dispatch({ type: 'SET_FOCUS', payload })
        },
        setFormError: async payload => {
            dispatch({ type: 'SET_FORM_ERROR', payload })
        },
        setFormLoading: async payload => {
            dispatch({ type: 'SET_FORM_LOADING', payload })
        },
        setFormReady: async payload => {
            dispatch({ type: 'SET_FORM_READY', payload })
        },
        setFormValues: async payload => {
            // console.log('setting form values', payload)
            dispatch({ type: 'SET_FORM_VALUES', payload })
        },
    }), [state, dispatch])
    
    return (
        <FormContext.Provider value={{ ...state, ...actions }}>
            {state.formLoaded && props.children}
        </FormContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action

    switch(type) {
        case 'SET_FORM_LOADED':
            return {
                ...state,
                formLoaded: true,
            }
            break
        case 'CLEAR_FORM':
            return {
                ...state,
                focused: null,
                formFields: { email: state.formFields.email },
                formReady: false,
                dirtyFields: [],
            }
            break
        case 'RESET_FORM':
            return {
                ...state,
                focused: 0,
                formError: null,
                formFields: { email: state.formFields.email },
                formReady: false,
                dirtyFields: [],
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
                formFields: payload,
                dirtyFields: [],
                // dirtyFields: Object.keys(state.formFields),
                formReady: true,
            }
            break
        case 'MARK_DIRTY':
            return {
                ...state,
                dirtyFields: [ ...state.dirtyFields, payload ],
            }
            break
        case 'SET_DIRTY_FIELDS':
            return {
                ...state,
                dirtyFields: payload,
            }
            break
        case 'SET_FOCUS':
            return {
                ...state,
                focused: payload,
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
        case 'SET_FORM_READY':
            return {
                ...state,
                formReady: payload,
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