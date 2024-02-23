import React, { useContext } from 'react'
import {
    useWindowDimensions,
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
import { getSize } from '@utils/metrics'
import { useTheme } from 'react-native-paper'

export default () => {

    const {
        dispatch,
        modal,
        user,
    } = useContext(AppContext)

    const theme = useTheme()

    const dims = useWindowDimensions()

    return (
        <SafeAreaView
            id='layout-container'
            style={{
                width: dims.width,
                height: dims.height,
                backgroundColor: theme?.colors.background,
            }}
        >
            <View
                id='header'
                style={{
                    width: dims.width,
                    height: 50,
                    backgroundColor: theme?.colors.background,
                }}
            >
                <View
                    id='header-container'
                    style={{
                        width: '100%',
                        minWidth: 300,
                        maxWidth: 600,
                        marginHorizontal: 'auto',
                    }}
                >
                    <Header
                        user={user}
                        size={getSize(dims)}
                    />
                </View>

            </View>

            <View
                id='content-container'
                style={{
                    height: dims.height - 50,
                    width: dims.width,
                    backgroundColor: theme?.colors.background,
                }}
            >
                
                <View
                    id='content'
                    style={{
                        width: '100%',
                        minWidth: 300,
                        maxWidth: 600,
                        height: dims.height - 50,
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
    )
}