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
            width: '100%',
            minWidth: 375,
            marginHorizontal: 'auto',
            paddingHorizontal: 5,
        }}>
            {children}
        </View>
    )
}

export default Screen