import React, { useContext } from 'react'
import {
    SafeAreaView,
    useWindowDimensions,
    View,
} from 'react-native'
import AppNavigation from '../navigation/AppNavigation'
import {
    ModalView,
} from '@components'
import {
    Header,
} from '.'
import LinearGradient from 'react-native-linear-gradient'
import { getSize } from '@utils/metrics'
import {
    AppContext,
    useApp,
    useUser,
} from '@context'

export default () => {
    const { profile } = useUser()
    
    const {
        isLandscape,
        isThemeDark,
    } = useContext(AppContext)

    const { theme } = useApp()

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
            <LinearGradient
                id='header-container'
                style={{
                    flexGrow: 0,
                    backgroundColor: theme?.colors.background,
                }}
                colors={isThemeDark
                    ? [ '#333333', '#000000' ]
                    : [ '#dddddd', '#ffffff' ]
                }
            >
                <View
                    style={{
                        width: '100%',
                        height: 50,
                        maxWidth: isLandscape ? 900 : 600,
                        marginHorizontal: 'auto',
                    }}
                >
                    <Header
                        user={profile}
                        size={getSize(dims)}
                    />
                </View>
            </LinearGradient>

            <View
                id='content-container'
                style={{
                    flex: 1,
                    width: '100%',
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
                        marginHorizontal: 'auto',
                    }}
                >
                    
                    <AppNavigation />

                </View>

            </View>

            <ModalView />

        </SafeAreaView>
    )
}