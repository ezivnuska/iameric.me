import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import {
    CenteredLoader,
    Header,
} from '.'
import { navigate } from '../navigators/RootNavigation'

const Screen = ({ children }) => {

    const {
        dimensions,
        loaded,
        user,
    } = useContext(AppContext)

    // useEffect(() => {
    //     if (!user || !loaded) navigate('Start')
    // }, [])

    return (
        <View style={{
            height: dimensions.window.height - 50,
            width: dimensions.window.width,//'100%',
            minWidth: 375,
            maxWidth: 450,
            marginHorizontal: 'auto',
            // paddingHorizontal: 0,//5,
            // borderWidth: 1,
        }}>
            {children}
        </View>
    )
}

export default Screen