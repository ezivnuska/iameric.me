import React, { useEffect } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import {
    Nav,
} from '@components'
import {
    useAuth,
    useApp,
    useUser,
} from '@context'
import { navigationRef } from '@navigation/RootNavigation'

export default ({
    children,
    navigation,
    route,
    secure = true,
    titleComponent = null,
}) => {
    
    // const { clearCart } = useCart()
    const { dims, landscape, theme } = useApp()
    const { authStatus, signOut } = useAuth()
    const { profile } = useUser()

    // useEffect(() => {
    //     console.log('route', route)
    // }, [])
    
    useEffect(() => {
        if (!authStatus) {
            if (profile) signOut()
            else if (route) navigationRef.navigate(route.name !== 'Start' ? route.name : 'Profile')
        }
    }, [profile])

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
                {authStatus && <Nav />}

                <ScrollView
                    style={{
                        height: dims.height - 50,
                        width: '100%',
                        maxWidth: landscape ? '100%' : 600,
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