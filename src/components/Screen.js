import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import { AppContext } from '../AppContext'

export default ({ children }) => {

    const {
        dims,
    } = useContext(AppContext)

    return (
        <View
            style={{
                height: dims.window.height - 50,
                width: dims.window.width,//'100%',
                minWidth: 375,
                maxWidth: 375,
                marginHorizontal: 'auto',
                paddingVertical: 20,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
            }}
        >
            {children}
        </View>
    )
}