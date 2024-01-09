import React, { useContext, useEffect } from 'react'
import {
    Dimensions,
    SafeAreaView,
    View,
} from 'react-native'
import { PublicNavigation, PrivateNavigation } from '../navigators'
import { AppContext } from '../AppContext'
import {
    Header,
    LoadingView,
} from '@components'
import base from '../styles/base'

let initialDims = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
}

export default () => {

    const {
        dispatch,
        dims,
        user,
    } = useContext(AppContext)

    useEffect(() => {
        // console.log('initial dims', initialDims)
        dispatch({ type: 'SET_DIMS', dims: initialDims })

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => dispatch({ type: 'SET_DIMS', dims: { window, screen } })
        )

        return () => subscription.remove()
    }, [])

    // useEffect(() => {
    //     console.log('dims changed', dims)
        
    // }, [dims])

    return dims ? (
        <SafeAreaView
            style={{
                width: dims.window.width,
                height: dims.window.height,
                backgroundColor: base.backgroundColor,
                // borderWidth: 2,
                // borderStyle: 'dashed',
                // borderColor: 'green',
            }}
        >
            <Header />
            <View
                style={{
                    height: dims.window.height - 50,
                    width: dims.window.width,
                    maxWidth: 375,
                    marginHorizontal: 'auto',
                    // borderWidth: 2,
                    // borderStyle: 'dashed',
                    // borderColor: 'purple',
                }}
            >
                {user
                    ? <PrivateNavigation user={user} />
                    : <PublicNavigation />
                }
                {/* <Navigation /> */}
            </View>
        </SafeAreaView>
    ) : (
        <SafeAreaView
            style={{
                width: '100%',
                paddingTop: 100,
                // borderWidth: 2,
                // borderStyle: 'dashed',
                // borderColor: 'purple',
            }}
        >
            <LoadingView />
        </SafeAreaView>
    )
}