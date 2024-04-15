import React from 'react'
import {
    ScrollView,
    useWindowDimensions,
    View,
} from 'react-native'
import {
    useApp,
} from '@context'

export default ({
    children,
    titleComponent = null,
    tabs = true,
}) => {
    
    const { isLandscape, theme } = useApp()

    const dims = useWindowDimensions()

    return (
        <View
            style={[
                {
                    alignItems: 'flex-start',
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
                    {children}
                </ScrollView>
            </View>
        </View>
    )
}