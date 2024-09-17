import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'

export default ({ onChange }) => {

    const [time, setTime] = useState(0)
    const intervalId = useRef(null)

    const formattedTime = useMemo(() => {
        const min = Math.floor(time / 60)
        let minutes = min < 10 ? `0${min}` : min
        let seconds = time > 60 ? time % 60 : time < 10 ? `0${time}` : time
        return `${minutes}:${seconds}`
    }, [time])

    useEffect(() => {
        intervalId.current = setInterval(() => {
            setTime(time + 1)
        }, 1000)

        return () => {
            clearInterval(intervalId.current)
        }
    }, [time])

    return (
        <View
            style={{
                marginHorizontal: 'auto',
            }}
        >
            <ThemedText
                size={24}
                bold
            >
                {formattedTime}
                {/* {`00:${time < 10 ? `0${time}` : time}`} */}
            </ThemedText>
        </View>
    )
}