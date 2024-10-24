import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const initialState = {
    level: 4,
    ticks: 0,
    tiles: [],
    setTiles: () => {},
    startTicker: () => {},
    stopTicker: () => {},
    tick: () => {},
    resetTicks: () => {},
}

export const PlayContext = createContext(initialState)

export const usePlay = () => {
    const context = useContext(PlayContext)
    if (!context) {
        throw new Error()
    }
    return context
}

export const PlayContextProvider = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const [ticker, setTicker] = useState(null)

    const getTile = id => state.tiles.filter(t => t.id === id)[0]

    const tick = () => {
        dispatch({ type: 'TICK' })
    }

    const setTiles = payload => {
        dispatch({ type: 'SET_TILES', payload })
    }

    const startTicker = () => {
        const interval = setInterval(tick, 1000)
        setTicker(interval)
    }

    const stopTicker = () => {
        clearInterval(ticker)
        setTicker(null)
    }

    const resetTicks = () => {
        dispatch({ type: 'RESET_TICKS' })
    }

    useEffect(() => {

        // do something?
        return () => {
            console.log('unmounting')
            clearInterval(ticker)
        }
    }, [])

    const ticking = useMemo(() => ticker && ticker !== null, [ticker])

    const actions = useMemo(() => ({
        setTiles,
        tick,
        startTicker,
        stopTicker,
        resetTicks,
    }), [state, dispatch])

    return  (
        <PlayContext.Provider
            value={{
                ...state,
                ...actions,
                ticking,
                getTile,
            }}
        >
            {props.children}
        </PlayContext.Provider>
    )
}

const reducer = (state, action) => {
    const { payload, type } = action
    switch(type) {
        case 'TICK':
            return {
                ...state,
                ticks: state.ticks + 1,
            }
            break
        case 'SET_TILES':
            return {
                ...state,
                tiles: payload,
            }
            break
        case 'RESET_TICKS':
            return {
                ...state,
                ticks: 0,
            }
            break
        default:
            throw new Error()
    }
}