import React, { useEffect } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import {
    Cart,
    LoadingView,
} from '@components'
import { useApp } from '@context'

export default ({
    children,
    navigation,
    secure = true,
    route,
    ...props
}) => {
    
    const { appLoaded, userId } = useApp()

    useEffect(() => {
        if (appLoaded) {
            if (secure && !userId) {
                if (secure) navigation.navigate('Start')
            }
        }
    }, [appLoaded, userId])

    if (!appLoaded) return <LoadingView loading='Authorizing...' />

    return (
        <View
            style={[{
                height: '100%',
                justifyContent: 'flex-start',
            }, props.style]}
        >
            {userId && (
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    <Cart />
                </View>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
            >
                {children}
            </ScrollView>
        </View>
    )
}