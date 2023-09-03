import React, { useContext, useEffect, useState } from 'react'
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { Navigation } from '../navigators'
import { AppContext } from '../AppContext'
import { CenteredLoader, Header } from '../components'
import base from '../styles/base'

let dims = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
}

const Layout = () => {

    const {
        dispatch,
        dimensions,
    } = useContext(AppContext)

    const setDims = dimensions => dispatch({ type: 'SET_DIMS', dims: dimensions })

    useEffect(() => {
        
        setDims(dims)

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => setDims({ window, screen })
        )

        return () => subscription.remove()
    }, [])

    return dimensions ? (
        <SafeAreaView style={[
            styles.layoutContainer,
            {
                width: dimensions.window.width,
                height: dimensions.window.height,
            }
        ]}>
            <Header />
            <ScrollView
                // style={{ height: dimensions.window.height - 50 }}
                // scrollEventThrottle={16}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                //     { useNativeDriver: false }
                // )}
            >
                <Navigation />
            </ScrollView>
        </SafeAreaView>
    ) : <CenteredLoader />
}

export default Layout

const styles = StyleSheet.create({
    layoutContainer: {
        backgroundColor: base.backgroundColor,
    },
})