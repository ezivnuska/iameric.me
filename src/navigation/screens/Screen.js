import React, { useContext } from 'react'
import {
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native'
import { AppContext } from '../../AppContext'
import { useTheme } from '@react-navigation/native'

export default ({
    children,
    titleComponent = null,
    secure = true,
    tabs = true,
}) => {

    const {
        isLandscape,
        user,
    } = useContext(AppContext)
    
    const theme = useTheme()

    const dims = useWindowDimensions()

    return (
        <View
            style={[
                {
                    alignItems: 'flex-start',
                    height: dims.height - 50,
                    backgroundColor: theme?.colors.background,
                },
            ]}
        >
            <View
                style={{
                    width: '100%',
                    backgroundColor: theme?.colors.screen,
                }}
            >
                {titleComponent}

                <ScrollView
                    style={{
                        height: tabs ? dims.height - 150 : dims.height - 50,
                        width: '100%',
                        maxWidth: isLandscape ? '100%' : 600,
                        marginHorizontal: 'auto',
                    }}
                    contentContainerStyle={{
                        height: '100%',
                    }}
                >
                    {(!secure || secure && user) && children}
                </ScrollView>
            </View>
        </View>
    )
}