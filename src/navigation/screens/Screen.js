import React, { useContext } from 'react'
import {
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native'
import { AppContext } from '../../AppContext'
import { useTheme } from '@react-navigation/native'
import { getOrientation } from '@utils/metrics'

export default ({
    children,
    titleComponent = null,
    secure = true,
    tabs = true,
    padded = true,
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
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    // horizontal={isLandscape}
                    style={{
                        flex: 1,
                        width: '100%',
                        textAlign: 'left',
                        borderWidth: 1,
                        margin: 0,
                        padding: 0,
                        horizontalMargin: isLandscape ? 0 : 'auto',
                        textAlign: 'center',
                    }}
                    contentContainerStyle={{
                        height: dims.height - 150,
                        width: '100%',
                        maxWidth: isLandscape ? 900 : 600,
                        marginHorizontal: 'auto',
                        // paddingVertical: 15,
                    }}
                >
                    <View
                        style={{
                            height: dims.height - 150,
                            width: '100%',
                            maxWidth: isLandscape ? 900 : 600,
                            // minWidth: 280,
                            // marginVertical: !landscape ? 0 : 0,
                            // marginHorizontal: !landscape ? 'auto' : 0,
                            marginHorizontal: 'auto',
                        }}
                    >
                        {(!secure || secure && user) && children}
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}