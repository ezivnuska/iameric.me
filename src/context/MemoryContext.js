import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const initialState = {
    memories: [],
    error: null,
    memoriesLoading: false,
    uploadData: null,
    addMemory: () => {},
    deleteMemory: () => {},
    findMemoryById: () => {},
    setMemories: () => {},
    setMemoriesLoading: () => {},
    setUploadData: () => {},
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

    const findMemoryById = memoryId => state.memories.filter(memory => memory._id === memoryId)[0]
    
    const actions = useMemo(() => ({
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
            dispatch({ type: 'SET_MEMORIES_LOADING', payload })
        },
        setUploadData: async payload => {
            dispatch({ type: 'SET_UPLOAD_DATA', payload })
        },
        updateMemory: async payload => {
            dispatch({ type: 'UPDATE_MEMORY', payload })
        },
    }), [state, dispatch])

    return  (
        <MemoryContext.Provider
            value={{
                ...state,
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
        case 'SET_MEMORIES_LOADING':
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
        case 'SET_UPLOAD_DATA':
            return {
                ...state,
                uploadData: payload,
            }
            break
        case 'UPDATE_MEMORY':
            let newMemory = true
            const memories = state.memories.map((memory, i) => {
                if (memory._id === payload._id) {
                    newMemory = false
                    return {
                        ...memory,
                        ...payload,
                    }
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