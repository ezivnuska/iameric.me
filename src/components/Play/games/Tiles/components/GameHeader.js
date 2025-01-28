import React, { useEffect, useMemo, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { usePlay } from '@context'

const GameHeader = ({ status, onChangeStatus }) => {
    
    const {
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
        
        switch (status) {
            case 'idle':
                resetTicks()
                break
            case 'start':
                startPlay()
                break
            case 'playing':
                startTicker()
                break
            case 'paused':
                stopTicker()
                break
            case 'resolved':
                setScore(formattedTime)
                stopTicker()
                handleWin()
                break
            default:
        }
    }, [status])

    const handleWin = () =>  {
        // resetTicks()
        onChangeStatus('resolved')
    }

    const startPlay = () => {
        onChangeStatus('start')
    }

    const unpause = () => {
        onChangeStatus('playing')
    }

    const pause = () => {
        onChangeStatus('paused')
    }

    const reset = () => {
        resetTicks()
        setScore(null)
        onChangeStatus('idle')
    }

    const renderPanel = () => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: 10,
                }}
            >
                {status === 'idle'
                    ? (
                        <Button onPress={startPlay}>
                            Start
                        </Button>
                    )
                    : status === 'paused'
                        ? (
                            <Button onPress={unpause}>
                                Continue
                            </Button>
                        )
                        : status === 'resolved'
                            ? (
                                <Button onPress={reset}>
                                    Finish
                                </Button>
                            )
                            : (
                                <Button onPress={pause}>
                                    Pause
                                </Button>
                            )
                }

                {status === 'paused' && (
                    <Button onPress={reset}>
                        Give Up
                    </Button>
                )}

            </View>
        )
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
                        <Text variant='titleLarge'>
                            Score: {formattedTime}
                        </Text>
                    </Pressable>
                )
                : ticks > 0
                    ? (
                        <Text variant='titleLarge'>
                            Time: {formattedTime}
                        </Text>
                    )
                    : null
            }
        </View>
    )
}

export default GameHeader