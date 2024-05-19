import React, { useEffect } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import {
    CartView,
    LoadingView,
} from '@components'
import {
    useApp,
} from '@context'

export default ({
    children,
    secure = true,
    ...props
}) => {
    
    const { appLoaded, userId } = useApp()

    useEffect(() => {
        if (secure && !userId) props.navigation.navigate('Start')
        //     else if (userId) props.navigation.navigate('Auth')
    }, [userId])

    if (!appLoaded) return <LoadingView loading='Authorizing...' />

    return (
        <View style={{
            height: '100%',
            justifyContent: 'flex-start',
        }}>
            {userId && (
                <View
                    style={{
                        flexBasis: 'auto',
                        flexGrow: 0,
                    }}
                >
                    <CartView />
                </View>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {children}
            </ScrollView>
        </View>
    )
}