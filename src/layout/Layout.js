import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { Navigation } from '../navigators'
import { Header } from '.'

const windowDimensions = Dimensions.get('window')
const screenDimensions = Dimensions.get('screen')

const Layout = () => {
    
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
        <SafeAreaView style={[styles.layoutContainer, { width: dimensions.window.width }]}>
            <Header />
            <ScrollView
                style={{ height: dimensions.window.height - 50 }}
                // scrollEventThrottle={16}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                //     { useNativeDriver: false }
                // )}
            >
                <Navigation />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Layout

const styles = StyleSheet.create({
    layoutContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        height: '100%',
        minHeight: '100%',
    },
})