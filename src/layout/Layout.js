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
import { getLocally } from '../utils/storage'
import { useTheme } from 'react-native-paper'

let initialDims = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
}

console.log('initialDims', initialDims)

export default () => {

    const {
        dispatch,
        dims,
        isThemeDark,
        toggleTheme,
    } = useContext(AppContext)

    const theme = useTheme()

    useEffect(() => {

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => dispatch({ type: 'SET_DIMS', dims: { window, screen } })
        )

        getLocalTheme()

        return () => subscription.remove()
    }, [])

    const getLocalTheme = async () => {
        const isDark = await getLocally('dark')
        if (isDark && !isThemeDark) toggleTheme()

        dispatch({ type: 'SET_DIMS', dims: initialDims })
    }

    // useEffect(() => {
    //     console.log('dims changed', dims)
    // }, [dims])

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