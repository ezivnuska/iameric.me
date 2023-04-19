import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native'
import { Body, Header } from './'
import { Navigation } from '../navigators'

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

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
        <View style={[styles.layoutContainer, { width: dimensions.window.width }]}>
            <Header>iameric</Header>
            <Body>
                <Navigation />
            </Body>
        </View>
    )
}

export default Layout

const styles = StyleSheet.create({
    layoutContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        minHeight: '100%',
    },
})