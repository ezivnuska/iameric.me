import React, { useContext, useEffect } from 'react'
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
} from 'react-native'
import { Navigation } from '../navigators'
import { AppContext } from '../AppContext'
import {
    Header,
    LoadingView,
} from '../components'
import base from '../styles/base'

let initialDims = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
}

export default () => {

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
        <SafeAreaView
            style={{
                width: dims.window.width,
                height: dims.window.height,
                backgroundColor: base.backgroundColor,
            }}
        >
            <Header />
            <ScrollView>
                <Navigation />
            </ScrollView>
        </SafeAreaView>
    ) : (
        <SafeAreaView
            style={{
                width: '100%',
                paddingTop: 100,
            }}
        >
            <LoadingView label='i am eric.' />
        </SafeAreaView>
    )
}