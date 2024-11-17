import React, { useEffect, useMemo } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { Footer } from './components'
import { useApp } from '@app'
import { useUser } from '@user'

const Screen = ({ children, secure = false, ...props }) => {

    const { setAuthRoute } = useApp()
    const { user } = useUser()

    const authorized = useMemo(() => (!secure || user !== null), [user, secure])
    const routeName = useMemo(() => props.route.name, [props])

    useEffect(() => {
        if (!authorized) {
            setAuthRoute(props.route.name)
            props.navigation.navigate('Home')
        }
    }, [routeName])

    if (!authorized) {
        console.log('not authorized')
        return <View />
    }

    return (
        <View style={{ flex: 1 }}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 1 }}
                contentContainerStyle={{ flex: 1, width: '100%' }}
            >
                {children}
            </ScrollView>

            <View style={{ flexGrow: 0 }}>
                <Footer />
            </View>

        </View>
    )
}

export default Screen