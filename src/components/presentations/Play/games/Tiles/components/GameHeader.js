import React, { useEffect, useMemo, useState } from 'react'
import {
    Pressable,
    Text,
    View,
} from 'react-native'
import {
    SimpleButton,
    TextCopy,
} from '@components'
import { usePlay } from '@context'

const GameHeader = ({ status, onChangeStatus }) => {
    
    let ticker = null

    const {
        ticking,
        ticks,
        startTicker,
        stopTicker,
        resetTicks,
    } = usePlay()

    const [score, setScore] = useState(null)

    const formattedTime = useMemo(() => {
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
            case 'start':
                // stopTicker()
                break
            case 'playing':
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
        onChangeStatus('resolved')
    }

    // const handlePress = () => {
    //     if (!ticking) onGameStart()
    //     else if (ticks > 0) stopTicker()
    //     else startTicker()
    // }

    const startPlay = () => {
        startTicker()
        onChangeStatus('playing')
    }

    const startDevPlay = () => {
        startTicker()
        onChangeStatus('dev')
    }

    const unpause = () => {
        startTicker()
        onChangeStatus(status !== 'dev' ? 'playing' : 'dev')
    }

    const pause = () => {
        stopTicker()
        onChangeStatus('paused')
    }

    const reset = () => {
        stopTicker()
        resetTicks()
        setScore(null)
        onChangeStatus('start')
    }

    const renderDefaultPanel = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <SimpleButton
                    label={`Start`}
                    onPress={startPlay}
                />

                <SimpleButton
                    label={`Easy (dev)`}
                    onPress={startDevPlay}
                />

            </View>
        )
    }

    const renderPlayingPanel = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <SimpleButton
                    label='Pause'
                    onPress={pause}
                />

                <Text>{status === 'dev' ? 'DEV' : 'Playing'}</Text>

            </View>
        )
    }

    const renderPausedPanel = () => (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                gap: 10,
            }}
        >
            
            <SimpleButton
                label='Continue'
                onPress={unpause}
            />

            <SimpleButton
                label='Give Up'
                onPress={reset}
            />

            <Text>Paused</Text>
        </View>
    )

    const renderResolvedPanel = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                <SimpleButton
                    label={`Finish`}
                    onPress={reset}
                />

                <Text>Winner!</Text>
            </View>
        )
    }

    const renderPanel = () => {
        switch (status) {
            case 'dev':
            case 'playing':
                return renderPlayingPanel()
                break
            case 'paused': return renderPausedPanel(); break
            case 'resolved': return renderResolvedPanel(); break
            default: return renderDefaultPanel()
        }
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            {renderPanel()}           

            {score
                ? (
                    <Pressable
                        style={{
                            flexBasis: 'auto',
                            flexDirection: 'row',
                            backgroundColor: '#f00',
                            borderRadius: 6,
                            overflow: 'hidden',
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <TextCopy color='#fff' bold>
                            Save Score: {formattedTime}
                        </TextCopy>
                    </Pressable>
                )
                : ticks > 0
                    ? (
                        <TextCopy>
                            Time: {formattedTime}
                        </TextCopy>
                    )
                    : null
            }
        </View>
    )
}

export default GameHeader