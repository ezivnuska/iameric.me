import React, { useContext } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { AppContext } from '../AppContext'
import { useTheme } from '@react-navigation/native'

export default ({ children, secure = true }) => {

    const {
        dims,
        user,
    } = useContext(AppContext)
    
    const theme = useTheme()

    return (
        <View
            style={[
                {
                    height: dims ? dims.window.height - 50 : '100%',
                    backgroundColor: theme?.colors.background,
                },
            ]}
        >
            <View
                style={{
                    height: dims ? dims.window.height - 100 : '100%',
                    backgroundColor: theme?.colors.screen,
                }}
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        paddingBottom: 50,
                        height: dims ? dims.window.height - 100 : '100%',
                        textAlign: 'left',
                    }}
                >

                    <View
                        style={{
                            width: 375,
                            marginHorizontal: 'auto',
                            paddingHorizontal: 10,
                        }}
                    >

                        {(!secure || secure && user) && children}

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}