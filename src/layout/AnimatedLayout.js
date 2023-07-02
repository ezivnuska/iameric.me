import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView,
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
            <ScrollView
                // style={{ flex: 1 }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
            >
                <Navigation />
            </ScrollView>
        </SafeAreaView>
    )
}

export default AnimatedLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: '#fff',
        backgroundColor: '#fff',
    },
})