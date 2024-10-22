import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { usePlay } from '@modules/Play'

export default GameHeader = ({ status, onGamePause, onGameReset, onGameStart, onGameEnd }) => {
    
    let ticker = null

    const {
        ticking,
        ticks,
        startTicker,
        stopTicker,
        resetTicks,
    } = usePlay()

    const [score, setScore] = useState(null)
    
    const timerText = useMemo(() => {
        let m = Math.floor(ticks / 60)
        let s = ticks < 60 ? ticks : ticks % 60
        return `${m > 0
            ? m < 10
                ? `0${m}`
                : `${m}`
            : `00`}:${s < 10 ? `0${s}` : s}`
    }, [ticks])

    useEffect(() => {
        return () => {
            console.log('unmounting')
            clearInterval(ticker)
        }
    }, [])

    useEffect(() => {
        switch (status) {
            case 'idle':
                // stopTicker()
                break
            case 'active':
                // startTicker()
                break
            case 'paused':
                // stopTicker()
                break
            case 'resolved':
                handleWin()
                break
            default:
        }
    }, [status])

    const handleWin = () =>  {
        stopTicker()
        setScore(ticks)
        resetTicks()
        onGameEnd()
    }

    // const handlePress = () => {
    //     if (!ticking) onGameStart()
    //     else if (ticks > 0) stopTicker()
    //     else startTicker()
    // }

    const play = () => {
        startTicker()
        onGameStart()
    }

    const pause = () => {
        stopTicker()
        onGamePause()
    }

    const reset = () => {
        stopTicker()
        resetTicks()
        setScore(null)
        onGameReset()
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                {!ticking ? (
                    <SimpleButton
                        label='Play'
                        onPress={play}
                    />
                ) : (
                    <SimpleButton
                        label='Pause'
                        onPress={pause}
                    />
                )}
                
                {(status === 'paused' || status === 'resolved') && (
                    <SimpleButton
                        label='Reset'
                        onPress={reset}
                    />
                )}
            </View>

            <View style={{ flexBasis: 'auto' }}>
                <ThemedText>
                    {score
                        ? `Score: ${score}`
                        : ticks > 0
                            ? timerText
                            : ` `
                    }
                </ThemedText>
            </View>
        </View>
    )
}