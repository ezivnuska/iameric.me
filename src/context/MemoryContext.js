import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { loadMemories } from '@utils/memories'

const initialState = {
    memories: [],
    error: null,
    memoriesLoaded: false,
    memoriesLoading: false,
    addMemory: () => {},
    deleteMemory: () => {},
    initMemories: () => {},
    setMemories: () => {},
    setMemoriesLoading: () => {},
    updateMemory: () => {},
}

export const MemoryContext = createContext(initialState)

export const useMemory = () => {
    const context = useContext(MemoryContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const MemoryContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const initMemories = async () => {

        dispatch({ type: 'SET_MEMORY_LOADING', payload: true })
        const payload = await loadMemories()
        dispatch({ type: 'SET_MEMORY_LOADING', payload: false })
        
        if (payload) dispatch({ type: 'SET_MEMORIES', payload })
        else console.log('could not load memories') 

        dispatch({ type: 'SET_MEMORY_LOADED' })
    }

    const findMemoryById = memoryId => state.memories.filter(memory => memory._id === memoryId)[0]
    
    // useEffect(() => {
    //     // loadMemories()
    // }, [])

    const actions = useMemo(() => ({
        initMemories,
        addMemory: async payload => {
            dispatch({ type: 'ADD_MEMORY', payload })
        },
        deleteMemory: async payload => {
            dispatch({ type: 'DELETE_MEMORY', payload })
        },
        findMemoryById,
        setMemories: async payload => {
            dispatch({ type: 'SET_MEMORIES', payload })
        },
        setMemoriesLoading: async payload => {
            dispatch({ type: 'SET_MEMORY_LOADING', payload })
        },
        updateMemory: async payload => {
            dispatch({ type: 'UPDATE_MEMORY', payload })
        },
    }), [state, dispatch])

    return  (
        <MemoryContext.Provider
            value={{
                ...state,
                // memoriesModal: state.modals[state.modals.length - 1],
                ...actions,
            }}
        >
            {props.children}
        </MemoryContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'ADD_MEMORY':
            return {
                ...state,
                memories: [ payload, ...state.memories ],
            }
            break
        case 'SET_MEMORY_LOADED':
            return {
                ...state,
                memoriesLoaded: true,
            }
            break
        case 'SET_MEMORY_LOADING':
            return {
                ...state,
                memoriesLoading: payload,
            }
            break
        case 'SET_MEMORIES':
            return {
                ...state,
                memories: payload,
            }
            break
        case 'UPDATE_MEMORY':
            let newMemory = true
            const memories = state.memories.map((memory, i) => {
                if (memory._id === payload._id) {
                    newMemory = false
                    return payload
                } else return memory
            })
            return {
                ...state,
                memories: newMemory ? [payload, ...state.memories] : memories,
            }
            break
        case 'DELETE_MEMORY':
            return {
                ...state,
                memories: state.memories.filter(memory => memory._id !== payload)}
            break
        default:
            throw new Error()
    }
}