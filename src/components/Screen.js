import React, { useContext } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import colors from '../styles/colors'

export default ({ children, ...props }) => {

    const {
        dims,
    } = useContext(AppContext)

    return (
        <View
            style={[
                {
                    height: dims ? dims.window.height - 50 : '100%',
                    width: '100%',
                    paddingHorizontal: 15,
                    backgroundColor: colors.backgroundDefault,
                },
            ]}
        >
            <ScrollView
                style={{
                    height: '100%',
                    paddingTop: 10,
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