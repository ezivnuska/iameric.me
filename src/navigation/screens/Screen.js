import React, { useContext } from 'react'
import {
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native'
import { AppContext } from '../../AppContext'
import { useTheme } from '@react-navigation/native'

export default ({ children, titleComponent = null, secure = true, tabs = true, padded = true }) => {

    const {
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
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: '100%',
                        height: 'auto',
                        textAlign: 'left',
                    }}
                >
                    <View
                        style={{
                            height: tabs ? dims.height - 150 : dims.height - 50,
                            width: '100%',
                            maxWidth: 600,
                            minWidth: 280,
                            marginHorizontal: 'auto',
                            paddingTop: tabs ? 15 : 0,
                        }}
                    >
                        {(!secure || secure && user) && children}
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}