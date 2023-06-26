import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    SafeAreaView,
} from 'react-native'
import { Navigation } from '../navigators'
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const FixedLayout = () => {
    
    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    })

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                setDimensions({ window, screen })
            }
        )
        return () => subscription.remove()
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            width: dimensions.window.width,
        }}>
            <Navigation />
        </SafeAreaView>
    )
}

export default FixedLayout