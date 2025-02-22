import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

let timer = null
const TIMEOUT = 500



const TappableView = ({ onSingle, onDouble, ...props }) => {
    
    const [taps, setTaps] = useState(0)

    const addTap = () => setTaps(taps + 1)
    const clearTaps = () => setTaps(0)

    useEffect(() => {

        // console.log(taps)
        // if (taps === 1) {
        //     single()
        // } else if (taps === 2) {
        //     double()
        // }
        
        setTimeout(() => {
            clearTaps()
        }, 1000)

    }, [taps])

    const debounce = () => {
        if (timer) {
            clearTimeout(timer)
            timer = null
            onDouble()
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                onSingle()
            }, TIMEOUT)
        }
    }

    // const onSingleTap = () => setTap('single')
    // const onDoubleTap = () => setTap('double')

    const onPress = () => {

        debounce()
        // addTap()
    }

    return (
        <Pressable
            {...props}
            onPress={onPress}
        />
    )
}

export default TappableView