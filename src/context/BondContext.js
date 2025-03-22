import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useUser } from '@context'
import { getBonds } from '@utils/bonds'

const initialState = {
    bonds: [],
    error: null,
    bondsLoaded: false,
    bondsLoading: false,
    addNewBond: () => {},
    getBond: () => {},
    removeBond: () => {},
    initBonds: () => {},
    setBonds: () => {},
    setBondsLoading: () => {},
    updateBond: () => {},
}

export const BondContext = createContext(initialState)

export const useBonds = () => {
    const context = useContext(BondContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const BondContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const { user } = useUser()

    const initBonds = async () => {
        dispatch({ type: 'SET_BONDS_LOADING', payload: true })
        const payload = await getBonds(user._id)
        dispatch({ type: 'SET_BONDS_LOADING', payload: false })
        
        if (!payload) console.log('could not load bonds')
        else dispatch({ type: 'SET_BONDS', payload })

        dispatch({ type: 'SET_BONDS_LOADED' })
    }

    useEffect(() => {
        if (user) initBonds()
    }, [user])

    const getBond = userId => {
        return state.bonds.filter(bond => (bond.sender === userId || bond.responder === userId))[0]
    }

    const actions = useMemo(() => ({
        getBond,
        addBond: payload => {
            dispatch({ type: 'ADD_BOND', payload })
        },
        removeBond: payload => {
            dispatch({ type: 'REMOVE_BOND', payload })
        },
        setBonds: payload => {
            dispatch({ type: 'SET_BONDS', payload })
        },
        setBondsLoading: payload => {
            dispatch({ type: 'SET_BONDS_LOADING', payload })
        },
        updateBond: payload => {
            dispatch({ type: 'UPDATE_BOND', payload })
        },
    }), [state, dispatch])

    return  (
        <BondContext.Provider value={{ ...state, ...actions }}>
            {children}
        </BondContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'ADD_BOND':
            return {
                ...state,
                bonds: [ payload, ...state.bonds ],
            }
            break
        case 'SET_BONDS_LOADED':
            return {
                ...state,
                bondsLoaded: true,
            }
            break
        case 'SET_BONDS_LOADING':
            return {
                ...state,
                bondsLoading: payload,
            }
            break
        case 'SET_BONDS':
            return {
                ...state,
                bonds: payload,
            }
            break
        case 'UPDATE_BOND':
            let bondExists = false
            const bonds = state.bonds.map(bond => {
                if (bond._id === payload._id) {
                    bondExists = true
                    return payload
                }
                else return bond
            })
            return {
                ...state,
                bonds: bondExists ? bonds : [payload, ...state.bonds],
            }
            break
        case 'REMOVE_BOND':
            return {
                ...state,
                bonds: state.bonds.filter(bond => bond._id !== payload)}
            break
        default:
            throw new Error()
    }
}