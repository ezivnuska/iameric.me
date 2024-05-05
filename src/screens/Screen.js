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
    
    const { appLoaded, userId } = useApp()

    useEffect(() => {
        if (secure) {
            if (!userId) props.navigation.navigate('Start')
        }
    }, [userId])

    if (!appLoaded) return <LoadingView loading='Authorizing...' />

    return userId ? (
        <ScrollView
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{
            //     height: '100%',
            // }}
        >
            {children}
        </ScrollView>
    ) : <LoadingView loading='Checking Auth...' />
}