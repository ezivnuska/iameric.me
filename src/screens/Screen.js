import React, { useEffect } from 'react'
import {
    ScrollView,
} from 'react-native'
import {
    LoadingView,
} from '@components'
import {
    useApp,
    useUser,
} from '@context'

export default ({
    children,
    secure = true,
    ...props
}) => {
    
    const { appLoaded, dims, userId } = useApp()

    useEffect(() => {
        if (secure && !userId) props.navigation.navigate('Start')
    }, [userId])

    if (!appLoaded) return <LoadingView loading='Authorizing...' />

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: dims.height - 50 }}
            // contentContainerStyle={{
            //     height: '100%',
            // }}
        >
            {children}
        </ScrollView>
    )
}