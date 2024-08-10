import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useApp } from '@app'
import { loadBips } from '@utils/bips'

const initialState = {
    bips: [],
    error: null,
    bipsLoaded: false,
    bipsLoading: false,
    addBip: () => {},
    addBipImage: () => {},
    removeBip: () => {},
    setBipsLoading: () => {},
    setBipImages: () => {},
}

export const BipContext = createContext(initialState)

export const useBips = () => {
    const context = useContext(BipContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const BipContextProvider = props => {
    
    const { user } = useApp()
    const [state, dispatch] = useReducer(reducer, initialState)
    
    useEffect(() => {
        const initBips = async () => {
            if (user) {
                dispatch({type: 'SET_BIPS_LOADING', payload: true })
                const data = await loadBips(user._id)
                dispatch({type: 'SET_BIPS_LOADING', payload: false })
                dispatch({type: 'SET_BIPS', payload: data })
            }
            dispatch({type: 'SET_BIPS_LOADED' })
        }
        
        initBips()
        
    }, [])

    const getBip = id => state.bips.filter(bip => bip._id === id)[0] || null

    const actions = useMemo(() => ({
        addBip: payload => {
            dispatch({ type: 'ADD_BIP', payload })
        },
        addBipImage: payload => {
            dispatch({ type: 'ADD_BIP_IMAGE', payload })
        },
        removeBip: payload => {
            dispatch({ type: 'REMOVE_BIP', payload })
        },
        setBipsLoading: payload => {
            dispatch({ type: 'SET_BIPS_LOADING', payload })
        },
        setBipImages: payload => {
            dispatch({ type: 'SET_BIP_IMAGES', payload })
        },
    }), [state, dispatch])

    return (
        <BipContext.Provider
            value={{
                ...state,
                ...actions,
                getBip,
            }}
        >
            {state.bipsLoaded && props.children}
        </BipContext.Provider>
    )
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch(type) {
        case 'SET_BIPS_LOADING':
            return {
                ...state,
                bipsLoading: payload,
            }
            break
        case 'SET_BIPS_LOADED':
            return {
                ...state,
                bipsLoaded: true,
            }
            break
        case 'ADD_BIP_IMAGE':
            return {
                ...state,
                bips: state.bips.map(bip => {
                    if (bip._id === payload.bipId) {
                        return {
                            ...bip,
                            images: bip.images ? [
                                ...bip.images,
                                payload.image,
                            ] : [payload.image],
                        }
                    } else {
                        return bip
                    }
                }),
            }
            break
        case 'SET_BIP_IMAGES':
            return {
                ...state,
                bips: state.bips.map(bip => {
                    if (bip._id === payload.bipId) {
                        return {
                            ...bip,
                            images: payload.images,
                        }
                    } else {
                        return bip
                    }
                }),
            }
            break
        case 'REMOVE_BIP':
            return {
                ...state,
                bips: state.bips.filter(bip => bip._id !== payload),
            }
            break
        case 'SET_BIPS':
            return {
                ...state,
                bips: payload,
            }
            break
        case 'ADD_BIP':
            return {
                ...state,
                bips: [ payload, ...state.bips ],
            }
            break
        case 'RESET':
            return {
                ...state,
                bips: [],
                bipsLoaded: false,
            }
            break
        default:
            throw new Error()
    }
}