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
    LoadingView,
} from '@components'
import base from '../styles/base'
import { useTheme } from 'react-native-paper'
import { light } from '../styles/colors'

let initialDims = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
}

export default () => {

    const {
        dispatch,
        dims,
        user,
        toggleTheme,
        isThemeDark,
    } = useContext(AppContext)

    const theme = useTheme()

    useEffect(() => {
        
        dispatch({ type: 'SET_DIMS', dims: initialDims })

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => dispatch({ type: 'SET_DIMS', dims: { window, screen } })
        )

        return () => subscription.remove()
    }, [])

    useEffect(() => {
        console.log('dims changed', dims)
    }, [dims])

    return dims ? (
        <SafeAreaView
            style={{
                width: dims.window.width,
                height: dims.window.height,
                backgroundColor: theme?.colors.headerSecondary,
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