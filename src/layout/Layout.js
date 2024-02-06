import React, { useContext, useEffect } from 'react'
import {
    Dimensions,
    SafeAreaView,
    View,
} from 'react-native'
import { Navigation } from '../navigators'
import { AppContext } from '../AppContext'
import {
    Header,
} from '@components'
// import { getLocally } from '../utils/storage'
import { useTheme } from 'react-native-paper'

let initialDims = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
}

export default () => {

    const {
        dispatch,
        dims,
    } = useContext(AppContext)

    const theme = useTheme()

    useEffect(() => {

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => dispatch({ type: 'SET_DIMS', dims: { window, screen } })
        )

        dispatch({ type: 'SET_DIMS', dims: initialDims })

        return () => subscription.remove()
    }, [])

    useEffect(() => {
        if (dims) console.log('dims changed', dims)
    }, [dims])

    return dims ? (
        <SafeAreaView
            style={{
                width: dims.window.width,
                height: dims.window.height,
                backgroundColor: theme?.colors.headerBackground,
            }}
        >
            <Header />
            <View
                style={{
                    height: dims.window.height - 50,
                    width: dims.window.width,
                    maxWidth: 375,
                    marginHorizontal: 'auto',
                }}
            >
                <Navigation />
            </View>
        </SafeAreaView>
    ) : null
}