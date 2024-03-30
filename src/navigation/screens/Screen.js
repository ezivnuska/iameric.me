import React, { useContext, useEffect } from 'react'
import {
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native'
import { AppContext } from '../../AppContext'
import { useTheme } from '@react-navigation/native'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default ({
    children,
    titleComponent = null,
    secure = true,
    tabs = true,
}) => {

    const {
        isLandscape,
        // modal,
        user,
    } = useContext(AppContext)
    
    const theme = useTheme()

    const dims = useWindowDimensions()

    // useEffect(() => {
    //     if (modal) {
    //         console.log('modal', modal)
    //         // alert('modal', modal)
    //     }
    // }, [modal])

    return (
        <View
            style={[
                {
                    // flex: 1,
                    alignItems: 'flex-start',
                    // height: dims.height - 50,
                    backgroundColor: theme?.colors.background,
                },
            ]}
        >
            <View
                style={{
                    width: '100%',
                    backgroundColor: theme?.colors.screen,
                }}
            >
                {titleComponent}

                <ScrollView
                    style={{
                        height: tabs ? dims.height - 150 : dims.height - 50,
                        width: '100%',
                        maxWidth: isLandscape ? '100%' : 600,
                        marginHorizontal: 'auto',
                    }}
                    contentContainerStyle={{
                        height: '100%',
                    }}
                >
                    {(!secure || secure && user) && children}
                </ScrollView>
            </View>
        </View>
    )
}