import React, { useEffect, useMemo } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import {
    LoadingView,
} from '@components'
import {
    useApp,
    useUser,
} from '@context'

const SecureLayer = ({ userId, children, ...props }) => userId ? (
    <View {...props}>
        {children}
    </View>
) : null

export default ({
    children,
    secure = true,
    ...props
}) => {
    
    const { appLoaded, userId } = useApp()
    const { profile } = useUser()
    
    useEffect(() => {
        if (secure) {
            if (!userId) props.navigation.navigate('Start')
        } else {
            if (userId) props.navigation.navigate('Auth')
        }
    }, [profile])

    if (!appLoaded) return <LoadingView loading='Authorizing...' />

    const renderContent = () => secure
        ? <SecureLayer userId={userId} {...props}>{children}</SecureLayer>
        : children

    return userId ? (
        <ScrollView
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{
            //     height: '100%',
            // }}
        >
            {renderContent(children)}
        </ScrollView>
    ) : <LoadingView loading='Checking Auth...' />
}