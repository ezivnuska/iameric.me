import React, { useContext, useEffect } from 'react'
import {
    Dimensions,
    SafeAreaView,
    View,
} from 'react-native'
import {
    // PublicNavigation,
    PrivateNavigation,
} from '../navigators'
import { AppContext } from '../AppContext'
import {
    Header,
    LoadingView,
} from '@components'
import base from '../styles/base'

export default () => {

    const {
        dispatch,
        dims,
        user,
    } = useContext(AppContext)

    const logDims = dimensions => {
        console.log(`window: ${dimensions.window.width} x ${dimensions.window.height}`)
        console.log(`screen: ${dimensions.screen.width} x ${dimensions.screen.height}`)
    }

    useEffect(() => {
        
        const initialDims = {
            window: Dimensions.get('window'),
            screen: Dimensions.get('screen'),
        }
        
        logDims(initialDims)

        dispatch({
            type: 'SET_DIMS',
            dims: initialDims,
        })

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                logDims({ window, screen })
                dispatch({ type: 'SET_DIMS', dims: { window, screen } })
            }
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
            <View
                style={{
                    height: dims.window.height - 50,
                    width: dims.window.width,
                    maxWidth: 375,
                    marginHorizontal: 'auto',
                }}
            >
                <PrivateNavigation />
            </View>
        </SafeAreaView>
    ) : (
        <SafeAreaView
            style={{
                width: '100%',
                paddingTop: 100,
            }}
        >
            <LoadingView />
        </SafeAreaView>
    )
}