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

const GameHeader = ({ status, onChangeStatus, changeLevel }) => {
    
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
                        <SimpleButton
                            label={`Start`}
                            onPress={startPlay}
                        />
                    )
                    : status === 'paused'
                        ? (
                            <SimpleButton
                                label='Continue'
                                onPress={unpause}
                            />
                        )
                        : status === 'resolved'
                            ? (
                                <SimpleButton
                                    label={`Finish`}
                                    onPress={reset}
                                />
                            )
                            : (
                                <SimpleButton
                                    label='Pause'
                                    onPress={pause}
                                />
                            )
                }

                {status === 'idle' && (
                    <SimpleButton
                        label={`Change Level`}
                        onPress={changeLevel}
                    />
                )}

                {status === 'paused' && (
                    <SimpleButton
                        label='Give Up'
                        onPress={reset}
                    />
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
                        <TextCopy color='#fff' bold>
                            Score: {formattedTime}
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