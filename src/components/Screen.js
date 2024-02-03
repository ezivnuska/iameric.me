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
    } = useContext(AppContext)
    
    const theme = useTheme()

    return (
        <View
            style={[
                {
                    paddingHorizontal: 10,
                    width: '100%',
                    height: dims ? dims.window.height - 50 : '100%',
                    backgroundColor: theme?.colors.background,
                },
            ]}
        >
            <ScrollView
                style={{
                    marginBottom: 50,
                    height: dims ? dims.window.height - 100 : '100%',
                }}
            >
                <View
                    style={{
                        height: dims ? dims.window.height - 100 : '100%',
                    }}
                >
                    {children}
                </View>
            </ScrollView>
        </View>
    )
}