import React, { useContext, useEffect, useState } from 'react'
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { Navigation } from '../navigators'
import { AppContext } from '../AppContext'
import {
    CenteredView,
    Header,
    LoadingView,
} from '../components'
import base from '../styles/base'

let initialDims = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
}

const Layout = () => {

    const {
        dispatch,
        dims,
    } = useContext(AppContext)

    useEffect(() => {
        
        dispatch({ type: 'SET_DIMS', dims: initialDims })

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => dispatch({ type: 'SET_DIMS', dims: { window, screen } })
        )

        return () => subscription.remove()
    }, [])

    return dims ? (
        <SafeAreaView style={[
            styles.layoutContainer,
            {
                width: dims.window.width,
                height: dims.window.height,
            }
        ]}>
            <Header />
            <ScrollView
                // style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: 'red' }}//, height: dimensions.window.height - 50
                // scrollEventThrottle={16}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                //     { useNativeDriver: false }
                // )}
            >
                <Navigation />
            </ScrollView>
        </SafeAreaView>
    ) : (
        <LoadingView label='getting started...' />
    )
}

export default Layout

const styles = StyleSheet.create({
    layoutContainer: {
        backgroundColor: base.backgroundColor,
    },
})