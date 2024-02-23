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
import { getSize, getOrientation } from '@utils/metrics'
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
                id='header-container'
                style={{
                    width: '100%',
                    minWidth: 280,
                    maxWidth: 600,
                    marginHorizontal: 'auto',
                    backgroundColor: theme?.colors.background,
                    // borderWidth: 1,
                    // borderColor: '#f00',
                }}
            >
                <Header
                    user={user}
                    size={getSize(dims)}
                    orientation={getOrientation(dims)}
                />
            </View>

            <View
                id='content-container'
                style={{
                    flex: 1,
                    // height: dims.height - 48,
                    width: '100%',
                    minWidth: 280,
                    maxWidth: 600,
                    marginHorizontal: 'auto',
                    backgroundColor: theme?.colors.background,
                }}
            >
                
                <View
                    id='content'
                    style={{
                        flex: 1,
                        width: '100%',
                        minWidth: 280,
                        maxWidth: 600,
                        // height: dims.height - 44,
                        marginHorizontal: 'auto',
                        // borderWidth: 1,
                        // borderColor: 'yellow',
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