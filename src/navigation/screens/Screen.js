import React, { useContext } from 'react'
import {
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    ThemedText,
} from '@components'
import { AppContext } from '../../AppContext'
import classes from '@styles/classes'
import { useTheme } from '@react-navigation/native'

export default ({ children, title = null, secure = true, tabs = true, padded = true }) => {

    const {
        user,
    } = useContext(AppContext)
    
    const theme = useTheme()

    const dims = useWindowDimensions()

    return (
        <View
            style={[
                {
                    height: dims.height - 50,
                    backgroundColor: theme?.colors.background,
                },
            ]}
        >
            <View
                style={{
                    // height: dims.height - 100,
                    height: tabs ? dims.height - 100 : '100%',
                    backgroundColor: theme?.colors.screen,
                }}
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: '100%',
                        height: tabs ? dims.height - 100 : dims.height - 50,
                        textAlign: 'left',
                        paddingHorizontal:  padded ? 8 : 0,
                    }}
                >
                    <View
                        style={{
                            height: tabs ? dims.height - 100 : dims.height - 50,
                        }}
                    >
                        {(!secure || secure && user) && children}
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}