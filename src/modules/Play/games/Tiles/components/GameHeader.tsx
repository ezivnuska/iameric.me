import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    SimpleButton,
    ThemedText,
} from '@components'
import { usePlay } from '@play'

export default ({ status, onGameStart, onGameEnd }) => {
    
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
                stopTicker()
                break
            case 'active':
                startTicker()
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
    }

    const handlePress = () => {
        if (ticking) stopTicker()
        else if (ticks > 0) startTicker()
        else onGameStart()
    }

    const endGame = () => {
        resetTicks()
        onGameEnd()
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
                <SimpleButton
                    label={ticking
                        ? 'Pause'
                        : ticks > 0
                            ? 'Resume'
                            : 'Play'

                    }
                    onPress={handlePress}
                />
                {(!ticking && ticks > 0) && (
                    <SimpleButton
                        label='Reset'
                        onPress={endGame}
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