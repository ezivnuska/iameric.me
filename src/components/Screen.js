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

const Screen = ({ children }) => {

    const {
        dimensions,
    } = useContext(AppContext)
    return (
        <View style={{
            height: dimensions.window.height - 50,
            width: dimensions.window.width,//'100%',
            minWidth: 375,
            // marginHorizontal: 0,//'auto',
            // paddingHorizontal: 0,//5,
            // borderWidth: 1,
        }}>
            {children}
        </View>
    )
}

export default Screen