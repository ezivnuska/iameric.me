import React, { useContext } from 'react'
import {
    ScrollView,
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
                // height: '100%',
                height: dims ? dims.window.height - 50 : '100%',
                width: '100%',
                // minWidth: 375,
                // maxWidth: 375,
                // marginHorizontal: 'auto',
                // paddingVertical: 20,
                backgroundColor: '#fff',
                paddingHorizontal: 15,
            }}
        >
            <ScrollView
                style={{
                    height: '100%',
                    paddingTop: 10,
                    // borderWidth: 2,
                    // borderStyle: 'dotted',
                    // borderColor: 'blue',
                }}
            >
                <View
                    style={{
                        paddingBottom: 50,
                    }}
                >
                    {children}
                </View>
            </ScrollView>
        </View>
    )
}