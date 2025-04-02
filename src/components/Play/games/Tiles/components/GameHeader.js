import React, { useEffect, useMemo, useState } from 'react'
import { Pressable } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Row } from '@components'
import { usePlay } from '@context'
import { Size } from '@utils/stack'

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
            case 'idle': resetTicks(); break
            case 'start': startPlay(); break
            case 'playing': startTicker(); break
            case 'paused': stopTicker(); break
            case 'resolved':
                setScore(formattedTime)
                stopTicker()
                handleWin()
                break
            default:
        }

    }, [status])

    const handleWin = () => onChangeStatus('resolved')
    const startPlay = () =>  onChangeStatus('start')
    const unpause = () => onChangeStatus('playing')
    const pause = () =>  onChangeStatus('paused')
    const reset = () => {
        resetTicks()
        setScore(null)
        onChangeStatus('idle')
    }

    return (
        <Row justify={'space-between'}>

            <Row flex={1} spacing={10}>

                {status === 'idle' && <Button onPress={startPlay}>Start</Button>}
                {status === 'playing' && <Button onPress={pause}>Pause</Button>}
                {status === 'resolved' && <Button onPress={reset}>Finish</Button>}
                {status === 'paused' && <Button onPress={unpause}>Continue</Button>}
                {status === 'paused' && <Button onPress={reset}>Give Up</Button>}

            </Row>

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
                : ticks > 0 && <Text variant='titleLarge'>Time: {formattedTime}</Text>
            }
        </Row>
    )
}

export default GameHeader