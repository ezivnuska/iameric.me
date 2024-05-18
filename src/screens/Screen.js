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
    }, [userId])

    if (!appLoaded) return <LoadingView loading='Authorizing...' />

    return (
        <View style={{ height: '100%' }}>
            <CartView />
            <ScrollView showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </View>
    )
}