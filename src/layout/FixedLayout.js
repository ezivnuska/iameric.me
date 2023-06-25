import React, { useEffect, useState } from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
} from 'react-native'
import { Body, Header } from '.'
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
        <View style={[styles.layoutContainer, { width: dimensions.window.width }]}>
            <Header>iameric</Header>
            <Body>
                <Navigation />
            </Body>
        </View>
    )
}

export default FixedLayout

const styles = StyleSheet.create({
    layoutContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        minHeight: '100%',
        borderWidth: 5,
        borderColor: 'pink',
    },
})