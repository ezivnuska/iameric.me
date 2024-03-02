import React, { useContext } from 'react'
import {
    useWindowDimensions,
    View,
} from 'react-native'
import { AppContext } from '../../AppContext'
import { useTheme } from '@react-navigation/native'

export default ({
    children,
    titleComponent = null,
    secure = true,
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

                <View
                    style={{
                        height: dims.height - 150,
                        width: '100%',
                        maxWidth: isLandscape ? '100%' : 600,
                        marginHorizontal: 'auto',
                    }}
                >
                    {(!secure || secure && user) && children}
                </View>
            </View>
        </View>
    )
}