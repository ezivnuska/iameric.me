import React, { useEffect } from 'react'
import {
    ScrollView,
    View,
} from 'react-native'
import { ScreenTitle } from './components'
import { useApp } from '@app'

export default ({ children, secure = true, title = null, ...props }) => {

    const {
        user,
    } = useApp()

    useEffect(() => {
        if (secure && !user) {
            console.log(`not authorized for path ${props.route.path || props.route.name}`)
            props.navigation.navigate('Home')
        }
    }, [user])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
        >
            <View style={{ flexGrow: 1, paddingBottom: 15 }}>
                
                {title && <ScreenTitle title={title} />}
                
                {children}

            </View>
        </ScrollView>
    )
}