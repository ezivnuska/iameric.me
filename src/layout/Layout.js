import React, { useContext, useEffect } from 'react'
import {
    Dimensions,
    SafeAreaView,
    View,
} from 'react-native'
import AppNavigation from '../navigation/AppNavigation'
import { AppContext } from '../AppContext'
import {
    ModalFactory,
} from '@components'
import {
    Header,
} from '.'
import { useTheme } from 'react-native-paper'

let initialDims = {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
}

export default () => {

    const {
        dispatch,
        dims,
        modal,
        user,
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

    return dims ? (
        <SafeAreaView
            id='layout-container'
            style={{
                width: dims.window.width,
                height: dims.window.height,
                backgroundColor: theme?.colors.background,
            }}
        >
            <View
                id='header'
                style={{
                    width: dims.window.width,
                    height: 50,
                    backgroundColor: theme?.colors.background,
                }}
            >
                <View
                    id='header-container'
                    style={{
                        width: '100%',
                        minWidth: 300,
                        maxWidth: 900,
                        marginHorizontal: 'auto',
                    }}
                >
                    <Header user={user} />
                </View>

            </View>

            <View
                id='content-container'
                style={{
                    height: dims.window.height - 50,
                    width: dims.window.width,
                    backgroundColor: theme?.colors.background,
                }}
            >
                
                <View
                    id='content'
                    style={{
                        width: '100%',
                        minWidth: 300,
                        maxWidth: 900,
                        height: dims.window.height - 50,
                        marginHorizontal: 'auto',
                    }}
                >
                    
                    <AppNavigation user={user} />

                </View>

            </View>

            <ModalFactory
                name={modal}
                close={() => dispatch({ type: 'CLOSE_MODAL' })}
            />

        </SafeAreaView>
    ) : null
}