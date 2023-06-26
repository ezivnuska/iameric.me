import React, { useEffect, useRef, useState } from 'react'
import {
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import { Body, Header } from '.'
import { Navigation } from '../navigators'

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const AnimatedLayout = () => {

    const [scrollOffsetY, setScrollOffsetY] = useState(useRef(new Animated.Value(0)).current)

    useEffect(() => {
        // scrollOffsetY = 
        console.log('scrollOffsetY', scrollOffsetY)
    }, [])
    
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
                scrollEventThrottle={40}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View style={[styles.layoutContainer, { width: dimensions.window.width }]}>
                    <Header>iameric</Header>
                    <Body>
                        <Navigation />
                    </Body>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AnimatedLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    layoutContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // height: '100%',
        // minHeight: '100%',
        // borderWidth: 5,
        // borderColor: 'pink',
    },
})