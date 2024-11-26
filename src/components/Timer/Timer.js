import React, { useEffect, useMemo, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    IconButton,
    DefaultText,
} from '@components'

const Timer = ({ status, onGameStart, onGameEnd }) => {
    
    let ticker = null

    const [time, setTime] = useState(0)
    const [score, setScore] = useState(null)
	const [timing, setTiming] = useState(false)
    
    const timerText = useMemo(() => {
        let m = Math.floor(time / 60)
        let s = time < 60 ? time : time % 60
        return `${m > 0 ? `${m}m ` : ``}${`${s}s`}`
    }, [time])

    useEffect(() => {
        console.log('timerText', timerText)
    }, [timerText])

    useEffect(() => {
        // return () => clearInterval(ticker)
    }, [])

    useEffect(() => {
        console.log('status change', status)
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

    const onTicker = () => {
        const newTime = time + 1
        console.log('time-->', newTime)
        setTime(newTime)
    }
    
    const startTicker = () => {
        console.log('startTicker', ticker)
        if (!ticker) ticker = setInterval(onTicker, 1000)
    }

    const stopTicker = () => {
        console.log('stopTicker', ticker)
        if (ticker) {
            clearInterval(ticker)
            ticker = null
        }
    }

    const handleWin = () =>  {
        setScore(time)
        // setTime(0)
    }

    const handlePress = () => {
        // console.log('ticker onPress', ticker)
        // if (ticker) {
        //     stopTicker()
        // } else {
            onGameStart()
        // }
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <View>
                <DefaultText>{status}</DefaultText>
            </View>
            <View>
                <DefaultText
                    size={24}
                    bold
                >
                    {timerText}
                </DefaultText>
            </View>
            <View>
                <IconButton
                    name={ticker ? 'close-circle-sharp' : 'reload-circle-sharp'}
                    size={30}
                    onPress={handlePress}
                />
            </View>
        </View>
    )
}

export default Timer