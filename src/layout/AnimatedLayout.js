import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Dimensions,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import { Header } from '.'
import { Navigation } from '../navigators'
import { Screen } from '../components'

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const AnimatedLayout = () => {

    const [scrollOffsetY, setScrollOffsetY] = useState(useRef(new Animated.Value(0)).current)
    
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
        <SafeAreaView style={styles.container}>
            <Header animHeaderValue={scrollOffsetY} />
            <Screen>
                <Navigation />
            </Screen>
        </SafeAreaView>
    )
}

export default AnimatedLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#fff',
        backgroundColor: 'pink',
    },
})