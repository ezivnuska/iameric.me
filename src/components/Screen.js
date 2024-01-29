import React, { useContext } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import { useTheme } from '@react-navigation/native'

export default ({ children, ...props }) => {

    const {
        dims,
        theme,
    } = useContext(AppContext)
    
    const { colors } = useTheme()

    return (
        <View
            style={[
                {
                    height: dims ? dims.window.height - 50 : '100%',
                    width: '100%',
                    paddingHorizontal: 10,
                    backgroundColor: colors.background,
                    // borderWidth: 1,
                    // borderColor: 'yellow'
                },
            ]}
        >
            <ScrollView
                style={{
                    height: dims ? dims.window.height - 100 : '100%',
                    // paddingTop: 10,
                    // borderWidth: 1,
                    // borderStyle: 'dotted',
                    // borderColor: 'yellow',
                    marginBottom: 50,
                }}
            >
                <View
                    style={{
                        // display: 'flex',
                        // flexDirection: 'column',
                        // justifyContent: 'flex-start',
                        height: dims ? dims.window.height - 100 : '100%',
                        // paddingBottom: 50,
                        // borderWidth: 1,
                        // borderStyle: 'dashed',
                        // borderColor: 'orange',
                    }}
                >
                    {children}
                </View>
            </ScrollView>
        </View>
    )
}